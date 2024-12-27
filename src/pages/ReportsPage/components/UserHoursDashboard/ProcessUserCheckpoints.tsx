interface Checkpoint {
  id: number;
  timestamp: string; // formato ISO
  checkpointType: 'entrada' | 'pausa' | 'retorno' | 'saída';
  status_value: number | null;
  justification: string | null;
  medicalCertificate: string | null;
  userId: string;
  User: {
    id: string;
    name: string;
  };
  status: {
    value: number;
    name: string;
  } | null;
}

interface UserSummary {
  userId: string;
  name: string;
  totalHours: number; // Horas totais trabalhadas
  justifiedHours: number; // Horas justificadas
  absences: number; // Número de dias ausentes
  daysWorked: number; // Dias trabalhados
  details: {
    date: string;
    workedHours: number;
    justified: boolean;
    justification?: string;
  }[]; // Detalhes por dia
}

const processUserCheckpoints = (data: Checkpoint[]): UserSummary[] => {
  const groupedByUser = data.reduce(
    (acc, checkpoint) => {
      const { userId, timestamp } = checkpoint;
      const date = new Date(timestamp).toISOString().split('T')[0];

      acc[userId] = acc[userId] || { name: checkpoint.User.name, days: {} };
      acc[userId].days[date] = acc[userId].days[date] || [];
      acc[userId].days[date].push(checkpoint);

      return acc;
    },
    {} as Record<string, { name: string; days: Record<string, Checkpoint[]> }>,
  );

  return Object.entries(groupedByUser).map(([userId, { name, days }]) => {
    let totalHours = 0;
    let justifiedHours = 0;
    let absenceHours = 0;
    let daysWorked = 0;

    const details = Object.entries(days).map(([date, checkpoints]) => {
      const sortedCheckpoints = checkpoints.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );

      let workedHours = 0;
      let dailyJustifiedHours = 0;
      let dailyAbsenceHours = 0;

      for (let i = 0; i < sortedCheckpoints.length - 1; i += 2) {
        const current = sortedCheckpoints[i];
        const next = sortedCheckpoints[i + 1];

        const currentTime = new Date(current.timestamp).getTime();
        const nextTime = new Date(next.timestamp).getTime();
        const intervalHours = (nextTime - currentTime) / 3600000;

        if (
          current.checkpointType === 'entrada' &&
          (next.checkpointType === 'pausa' || next.checkpointType === 'saída')
        ) {
          if (
            current.status_value === 1 &&
            (next.status_value === 1 || next.status_value === 9)
          ) {
            // Horas trabalhadas
            workedHours += intervalHours;
          } else if (
            current.status_value === 10 &&
            (next.status_value === 1 ||
              next.status_value === 9 ||
              next.status_value === 10)
          ) {
            // Horas de falta
            dailyAbsenceHours += intervalHours;
          } else {
            // Horas justificadas
            dailyJustifiedHours += intervalHours;
          }
        } else if (
          current.checkpointType === 'retorno' &&
          (next.checkpointType === 'saída' || next.checkpointType === 'pausa')
        ) {
          if (
            current.status_value === 1 &&
            (next.status_value === 1 || next.status_value === 9)
          ) {
            // Horas trabalhadas
            workedHours += intervalHours;
          } else if (
            current.status_value === 10 &&
            (next.status_value === 1 ||
              next.status_value === 9 ||
              next.status_value === 10)
          ) {
            // Horas de falta
            dailyAbsenceHours += intervalHours;
          } else {
            // Horas justificadas
            dailyJustifiedHours += intervalHours;
          }
        }
      }

      totalHours += workedHours;
      justifiedHours += dailyJustifiedHours;
      absenceHours += dailyAbsenceHours;

      if (workedHours > 0) {
        daysWorked++;
      }

      return {
        date,
        workedHours,
        justified: dailyJustifiedHours > 0,
        justification:
          dailyJustifiedHours > 0 ? 'Horas justificadas' : undefined,
        absenceHours: dailyAbsenceHours,
      };
    });

    return {
      userId,
      name,
      totalHours,
      justifiedHours,
      absences: absenceHours,
      daysWorked,
      details: details.map((detail, index) => ({
        ...detail,
        id: `${userId}-${index}`, // Gerando um id único com base no userId e índice
      })),
      id: userId,
    };
  });
};

export default processUserCheckpoints;

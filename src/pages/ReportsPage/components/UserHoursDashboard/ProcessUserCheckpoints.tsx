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
    let absences = 0;
    let daysWorked = 0;

    const details = Object.entries(days).map(([date, checkpoints]) => {
      const entry = checkpoints.find((c) => c.checkpointType === 'entrada');
      const pause = checkpoints.find((c) => c.checkpointType === 'pausa');
      const returnToWork = checkpoints.find(
        (c) => c.checkpointType === 'retorno',
      );
      const exit = checkpoints.find((c) => c.checkpointType === 'saída');
      const justified = checkpoints.some((c) => c.status?.name);

      let workedHours = 0;

      if (entry && exit) {
        const entryTime = new Date(entry.timestamp);
        const pauseTime = pause ? new Date(pause.timestamp) : null;
        const returnTime = returnToWork
          ? new Date(returnToWork.timestamp)
          : null;
        const exitTime = new Date(exit.timestamp);

        const morningHours = pauseTime
          ? (pauseTime.getTime() - entryTime.getTime()) / 3600000
          : 0;
        const afternoonHours = returnTime
          ? (exitTime.getTime() - returnTime.getTime()) / 3600000
          : (exitTime.getTime() - entryTime.getTime()) / 3600000;

        workedHours = morningHours + afternoonHours;
        totalHours += workedHours;
        daysWorked++;
      } else {
        absences++;
      }

      if (justified) {
        justifiedHours++;
      }

      return {
        date,
        workedHours,
        justified,
        justification: justified
          ? checkpoints.find((c) => c.status?.name)?.status?.name
          : undefined,
      };
    });

    return {
      userId,
      name,
      totalHours,
      justifiedHours,
      absences,
      daysWorked,
      details,
    };
  });
};

export default processUserCheckpoints;

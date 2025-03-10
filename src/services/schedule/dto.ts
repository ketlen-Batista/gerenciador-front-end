// Estrutura de dados para criação ou atualização dos horários
export interface ScheduleData {
  userId: string;
  mondayWork?: boolean;
  mondayEntryTime?: string;
  mondayPauseTime?: string;
  mondayReturnTime?: string;
  mondayExitTime?: string;

  tuesdayWork?: boolean;
  tuesdayEntryTime?: string;
  tuesdayPauseTime?: string;
  tuesdayReturnTime?: string;
  tuesdayExitTime?: string;

  wednesdayWork?: boolean;
  wednesdayEntryTime?: string;
  wednesdayPauseTime?: string;
  wednesdayReturnTime?: string;
  wednesdayExitTime?: string;

  thursdayWork?: boolean;
  thursdayEntryTime?: string;
  thursdayPauseTime?: string;
  thursdayReturnTime?: string;
  thursdayExitTime?: string;

  fridayWork?: boolean;
  fridayEntryTime?: string;
  fridayPauseTime?: string;
  fridayReturnTime?: string;
  fridayExitTime?: string;

  saturdayWork?: boolean;
  saturdayEntryTime?: string;
  saturdayPauseTime?: string;
  saturdayReturnTime?: string;
  saturdayExitTime?: string;

  sundayWork?: boolean;
  sundayEntryTime?: string;
  sundayPauseTime?: string;
  sundayReturnTime?: string;
  sundayExitTime?: string;
}

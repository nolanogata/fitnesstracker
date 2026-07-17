export function getHeroExceptionDisplay(input: {
  isExceptionDay: boolean;
  isTravelMode: boolean;
  showTravelNutrition: boolean;
}) {
  const muteGoalEvaluation = input.isExceptionDay;
  const hideGoalValues = muteGoalEvaluation && !(input.isTravelMode && input.showTravelNutrition);
  return {
    hideGoalValues,
    muteGoalEvaluation,
    forceFullProgress: muteGoalEvaluation,
  };
}

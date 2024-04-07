export const validateDates = ({ today, limitDate, notificationDate, notify },triggerToast) => {
  const validLimitDate = limitDate >= today;
  if (!validLimitDate) {
    triggerToast("Las fecha limite no puede ser días anteriores a hoy");
    return;
  }
  const validNotificationDate =
    !notify ||
    (notificationDate > today && notificationDate <= limitDate);

  if (!validNotificationDate)
    triggerToast(
      "Las fecha y hora de notificación no pueden ser menores a la fecha y hora actual ni mayores a la fecha limite"
    );

  return validLimitDate && validNotificationDate;
};

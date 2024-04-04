import moment from "moment";

moment.locale("es", {
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "algunos segundos",
    ss: "%d segundos",
    m: "1 minuto",
    mm: "%d minutos",
    h: "1 hora",
    hh: "%d horas",
    d: "1 dia",
    dd: "%d días",
    w: "1 semana",
    ww: "%d semanas",
    M: "1 mes",
    MM: "%d meses",
    y: "1 año",
    yy: "%d años",
  },
});

export default moment

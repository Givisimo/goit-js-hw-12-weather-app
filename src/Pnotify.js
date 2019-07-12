import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';

const options = {
  dir1: "left",
  context: document.getElementById('search-form'),
};
const alertOn = PNotify.alert({ text: 'Нет прав доступа к геопозиции, используйте поиск по имени города.!',
  stack: options});

export default alertOn;
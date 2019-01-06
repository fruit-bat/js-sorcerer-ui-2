import { ExidyFileBinaryAjax, ExidySorcerer, ExidyBrowserKeyboard } from 'js-sorcerer';

const exidyFile = new ExidyFileBinaryAjax();
const exidySorcerer = new ExidySorcerer(exidyFile);
const keyboard = new ExidyBrowserKeyboard(exidySorcerer.keyboard);

export default {

	getKeyboard() {
		return keyboard;
	},

	getCanvas() {
		return exidySorcerer.screenCanvas;
	},

	run() {
		exidySorcerer.run();
	},

  reset() {
    exidySorcerer.reset();
  },

  getDiskSystem() {
    return exidySorcerer.obtainDiskSystem();
  },

  attachPrinter(printer) {
    exidySorcerer.centronics = printer;
  }

}

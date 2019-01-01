import ExidyFileBinaryAjax from 'js-sorcerer/docs/ExidyFileBinaryAjax';
import ExidySorcerer  from 'js-sorcerer/docs/ExidySorcerer';
import ExidyBrowserKeyboard  from 'js-sorcerer/docs/ExidyBrowserKeyboard';

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
  }

}

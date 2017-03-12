import SYMBOL from './Symbol';


const FORMAT = {
	'Y-m-d': { 
		regex: `^${SYMBOL.Y.regex}\-${SYMBOL.m.regex}\-${SYMBOL.d.regex}$`, 
		type: 'Base' 
	},
    'Y M d': { 
    	regex: `^${SYMBOL.Y.regex}\\s${SYMBOL.M.regex}\\s${SYMBOL.d.regex}$`, 
    	type: 'Base' 
    },
    'Y MM d': { 
    	regex: `^${SYMBOL.Y.regex}\\s${SYMBOL.MM.regex}\\s${SYMBOL.d.regex}$`, 
    	type: 'Base' 
    },
    'm-d-Y': { 
    	regex: `^${SYMBOL.m.regex}\-${SYMBOL.d.regex}\-${SYMBOL.Y.regex}$`, 
	    type: 'Extended' 
	},
    'M d Y': { 
    	regex: `^${SYMBOL.M.regex}\\s${SYMBOL.d.regex}\\s${SYMBOL.Y.regex}$`, 
    	type: 'Base' 
    },
    'MM d Y': { 
    	regex: `^${SYMBOL.MM.regex}\\s${SYMBOL.d.regex}\\s${SYMBOL.Y.regex}$`, 
    	type: 'Base' 
    },
    'd-m-Y': { 
    	regex: `^${SYMBOL.d.regex}\-${SYMBOL.m.regex}\-${SYMBOL.Y.regex}$`, 
	    type: 'Extended' 
	},
    'd-M-Y': { 
    	regex: `^${SYMBOL.d.regex}\-${SYMBOL.M.regex}\-${SYMBOL.Y.regex}$`, 
	    type: 'Extended' 
	},
    'd-MM-Y': { 
    	regex: `^${SYMBOL.d.regex}\-${SYMBOL.MM.regex}\-${SYMBOL.Y.regex}$`, 
	    type: 'Extended' 
	},
    'd M Y': { 
    	regex: `^${SYMBOL.d.regex}\\s${SYMBOL.M.regex}\\s${SYMBOL.Y.regex}$`, 
	    type: 'Base' 
	},
    'd MM Y': { 
    	regex: `^${SYMBOL.d.regex}\\s${SYMBOL.MM.regex}\\s${SYMBOL.Y.regex}$`, 
	    type: 'Base' 
	},
    'Y/m/d': { 
    	regex: `^${SYMBOL.Y.regex}/${SYMBOL.m.regex}/${SYMBOL.d.regex}$`, 
    	type: 'Base' 
    },
    'm/d/Y': { 
    	regex: `^${SYMBOL.m.regex}/${SYMBOL.d.regex}/${SYMBOL.Y.regex}$`, 
    	type: 'Base' 
    },
    'd/m/Y': { 
    	regex: `^${SYMBOL.d.regex}\/${SYMBOL.m.regex}\/${SYMBOL.Y.regex}$`, 
	    type: 'Extended' 
	},
    'Y-m-d H:i:s': { 
    	regex: `^${SYMBOL.Y.regex}\-${SYMBOL.m.regex}\-${SYMBOL.d.regex}\\s${SYMBOL.H.regex}\:${SYMBOL.i.regex}\:${SYMBOL.s.regex}$`, 
    	type: 'Base' 
    },
    'Y-m-d H:i:s:ms': { 
    	regex: `^${SYMBOL.Y.regex}\-${SYMBOL.m.regex}\-${SYMBOL.d.regex}\\s${SYMBOL.H.regex}\:${SYMBOL.i.regex}\:${SYMBOL.s.regex}\:${SYMBOL.ms.regex}$`, 
    	type: 'Base' 
    },
    'Y-m-d g:i A': { 
    	regex: `^${SYMBOL.Y.regex}-${SYMBOL.m.regex}-${SYMBOL.d.regex}\\s${SYMBOL.g.regex}\:${SYMBOL.i.regex}\\s${SYMBOL.A.regex}$`, 
    	type: 'Extended' 
    },
    'Y-m-d g:i:s A': { 
    	regex: `^${SYMBOL.Y.regex}-${SYMBOL.m.regex}-${SYMBOL.d.regex}\\s${SYMBOL.g.regex}\:${SYMBOL.i.regex}\\s\:${SYMBOL.s.regex}\\s${SYMBOL.A.regex}$`, 
    	type: 'Extended' 
    },
    'UTC': { 
    	regex: `^${SYMBOL.Y.regex}\-${SYMBOL.m.regex}\-${SYMBOL.d.regex}T${SYMBOL.H.regex}\:${SYMBOL.i.regex}\:${SYMBOL.s.regex}Z$`, 
	    type: 'Base' 
	},
    'ISO': { 
    	regex: `^${SYMBOL.Y.regex}-${SYMBOL.m.regex}-${SYMBOL.d.regex}T${SYMBOL.H.regex}:${SYMBOL.i.regex}:${SYMBOL.s.regex}${SYMBOL.tz.regex}$`, 
    	type: 'Base' 
    },
    'Atom': {
    	regex: `^${SYMBOL.Y.regex}-${SYMBOL.m.regex}-${SYMBOL.d.regex}T${SYMBOL.H.regex}:${SYMBOL.i.regex}:${SYMBOL.s.regex}${SYMBOL.tz.regex}$`,
    	type: 'Extended'
    },
    'Cookie': {
    	regex: `${SYMBOL.DD.regex}\,\\s${SYMBOL.d.regex}-${SYMBOL.M.regex}-${SYMBOL.Y.regex}\\s${SYMBOL.H.regex}:${SYMBOL.i.regex}:${SYMBOL.s.regex}${SYMBOL.tz.regex}$`,
    	type: 'Extended'
    },
    'RSS':{
    	regex: `${SYMBOL.D.regex}\,\\s${SYMBOL.d.regex}\\s${SYMBOL.M.regex}\\s${SYMBOL.Y.regex}\\s${SYMBOL.H.regex}:${SYMBOL.i.regex}:${SYMBOL.s.regex}\\s${SYMBOL.tz.regex}$`,
    	type: 'Extended'
    }
}

export default FORMAT;
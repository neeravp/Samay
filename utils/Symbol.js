const SYMBOL = {
	Y:{
		regex:'(?:[1-9][0-9][0-9][0-9])', 
		validator:/(\/|\-|[ ]|\:|^)([^pa]?Y)/g, 
        prop:'year'
	},
    m:{
    	regex:'(?:[0][1-9]|[1][0-2])',    
        validator:/(\/|\-|[ ]|\:|^)([^pa]?m)/g, 
        prop:'month'
    },
    M:{
    	regex:'(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?M)/g, 
        prop:'monthShort'
    },
    MM:{
    	regex:'(?:January|February|March|April|May|June|July|August|September|October|November|December)', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?MM)/g, 
        prop:'monthName'
    },
    d:{
    	regex:'(?:[0][1-9]|[1-2][0-9]|[3][0-1])', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?d)/g, 
        prop:'date'
    },
    D:{
    	regex:'(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?D)/g, 
        prop:'dayShort'
    },
    DD:{
    	regex:'(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?DD)/g, 
        prop:'dayName'
    },
    H:{
    	regex:'(?:[0-1][0-9]|2[0-4])', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?H)/g, 
        prop:'hours'
    },
    hh:{
    	regex:'(?:[0-1][0-9]|2[0-4])', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?hh)/g, 
        prop:'hours'
    },
    g:{
    	regex:'(?:0[0-9]|1[0-2])', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?g)/g, 
    	prop:'getMeridianHours'
    },
    i:{
    	regex:'(?:[0-5][0-9])',
    	validator:/(\/|\-|[ ]|\:|^)([^a-z]?i)/g, 
        prop:'minutes'
    },
    mm:{
    	regex:'(?:[0-5][0-9])', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?mm)/g, 
        prop:'minutes'
    },
    s:{
    	regex:'(?:[0-5][0-9])', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?s)/g, 
        prop:'seconds'
    },
    ss:{
        regex:'(?:[0-5][0-9])', 
        validator:/(\/|\-|[ ]|\:|^)([^pa]?s)/g, 
        prop:'seconds'
    },
    ms:{
    	regex:'(?:[0-9][0-9][0-9])', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?ms)/g,
        prop:'milliseconds'
    },
    A:{
    	regex:'(?:[APap][Mm])', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?A$)/g, 
    	prop:'getMeridian'
    },
    tz:{
    	regex:'(?:[\+|\-]?(?:[0-1][0-9]|[1][0-4])\:(?:[0-5][0-9]))', 
    	validator:null, 
    	prop:'getTimezone'
    },
    ISO:{
    	regex:'(?:ISO)', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?ISO)/g, 
    	prop:'getIsoDate'
    },
    UTC:{
    	regex:'(?:UTC)', 
    	validator:/(\/|\-|[ ]|\:|^)([^pa]?UTC)/g, 
    	prop:'getUtcDate'
    },
    RSS:{
        regex:'(?:RSS)', 
        validator:/(\/|\-|[ ]|\:|^)([^pa]?RSS)/g, 
        prop:'getRssDate'
    },
    Atom:{
        regex:'(?:Atom)', 
        validator:/(\/|\-|[ ]|\:|^)([^pa]?Atom)/g, 
        prop:'getAtomDate'
    },
    Cookie:{
        regex:'(?:Cookie)', 
        validator:/(\/|\-|[ ]|\:|^)([^pa]?Cookie)/g, 
        prop:'getCookieDate'
    },

}

export default SYMBOL;

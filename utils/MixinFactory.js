
class MixinFactory {

	static add(target, ...sources) {   
	  sources.forEach(source => {
	  	// console.log(`Object.keys(source):`, Object.keys(source));
	  	// console.log(`Object.getOwnPropertyDescriptor(source, key): `, Object.getOwnPropertyDescriptor(source, Object.keys(source)[0]) )
	    let descriptors = Object.keys(source).reduce((descriptors, key) => {
	      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
	      return descriptors;
	    }, {});

	    Object.getOwnPropertySymbols(source).forEach(sym => {
	      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
	      if (descriptor.enumerable) {
	        descriptors[sym] = descriptor;
	      }
	    });
	    Object.defineProperties(target, descriptors);
	  });
	  return target;
	}
}
	

export default MixinFactory;

const server = require('./server');

server.boot();

function dec(id){
  console.log('evaluated', id);
  return (target, property, descriptor) => {
    console.log('target', target);
    console.log('property', property);
    console.log('descriptor', descriptor);
  }
}

class Test {

  @dec(1)
  test() {
    
  }

}

const test = new Test();
test.test();


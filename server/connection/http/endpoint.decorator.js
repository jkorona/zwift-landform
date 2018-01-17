function createMatchFunction(pattern) {
  return (uri) => {
    const matches = pattern.exec(uri);

    return {
      result: !!matches,
      args: matches ? matches.slice(1) : []
    }
  }
}

function Endpoint(pattern) {
  return (target, property, descriptor) => {
    const { value } = descriptor;

    value.$$matches = createMatchFunction(pattern);

    target.$$endpoints = (target.$$endpoints || [])
    target.$$endpoints.push(property);
  }
}

module.exports = Endpoint;

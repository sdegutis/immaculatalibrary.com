
export default () => 'in c!';

console.log(__dir.parent.files['bootstrapper.html'].buffer.toString('utf8'));

export default function checkDevelopmentNodeEnvironment(): boolean {
  if (process.env.NODE_ENV === 'development') return true;
  else return false;
}

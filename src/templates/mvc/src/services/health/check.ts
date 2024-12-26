
export default async function healthCheck() {
  return {
    statusCode: 200,
    body: { message: 'Healthy' },
  };
}

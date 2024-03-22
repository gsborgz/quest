describe('api/v1/migrations', () => {
  describe('GET', () => {
    it('should return 200', async () => {
      const response = await fetch('http://localhost:3000/api/v1/migrations');
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(responseBody)).toBe(true);
    });
  });

  describe('POST', () => {
    it.only('should return 200', async () => {
      const response = await fetch('http://localhost:3000/api/v1/migrations', { method: 'POST' });
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(responseBody)).toBe(true);
    });
  });
});

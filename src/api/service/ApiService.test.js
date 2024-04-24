import { ApiService } from './ApiService';

import axios from 'axios';
jest.mock('axios');

const URL = 'http://localhost:8090';

describe('ApiService - get', () => {
  const assertCallGetMethod = async (user = null) => {
    axios.get.mockResolvedValue({ data: 'TEST' });
    const test = await ApiService.get(URL, '/test');
    expect(test).toBe('TEST');
  };

  const assertCallGetMethodKo = async (message) => {
    axios.get.mockImplementation(() => Promise.reject(message));

    try {
      await ApiService.get(URL, '/test');
    } catch (error) {
      expect(error).toBe('ERROR');
    }
    expect(axios.get).toBeCalledWith('http://localhost:8090/test');
  };

  test('HTTP GET ', async () => {
    assertCallGetMethod({ accessToken: 'TOKEN' });
    expect(axios.get).toBeCalledWith('http://localhost:8090/test');
  });

  test('HTTP GET WITHOUT HEADER WITH ERROR', async () => {
    assertCallGetMethodKo('ERROR');
  });
});

describe('ApiService - put', () => {
  const assertCallPutMethod = async () => {
    axios.put.mockResolvedValue({ data: 'TEST' });

    const test = await ApiService.put(URL, '/test', []);
    expect(test).toBe('TEST');
    expect(axios.put).toBeCalledWith('http://localhost:8090/test', []);
  };

  const assertCallPutMethodKo = async (message) => {
    axios.put.mockImplementation(() => Promise.reject(message));

    try {
      await ApiService.put(URL, '/test', []);
    } catch (error) {
      expect(error).toBe('ERROR');
    }
    expect(axios.put).toBeCalledWith('http://localhost:8090/test', []);
  };

  test('HTTP PUT WITHOUT HEADER', async () => {
    assertCallPutMethod();
  });

  test('HTTP PUT WITHOUT HEADER WITH ERROR', async () => {
    assertCallPutMethodKo('ERROR');
  });
});

describe('ApiService - patch', () => {
  const assertCallPatchMethod = async () => {
    axios.patch.mockResolvedValue({ data: 'TEST' });

    const test = await ApiService.patch(URL, '/test', []);
    expect(test).toBe('TEST');
    expect(axios.patch).toBeCalledWith('http://localhost:8090/test', []);
  };

  const assertCallPatchMethodKo = async (message) => {
    axios.patch.mockImplementation(() => Promise.reject(message));

    try {
      await ApiService.patch(URL, '/test', []);
    } catch (error) {
      expect(error).toBe('ERROR');
    }
    expect(axios.patch).toBeCalledWith('http://localhost:8090/test', []);
  };

  test('HTTP PATCH WITHOUT HEADER', async () => {
    assertCallPatchMethod();
  });

  test('HTTP PATCH WITHOUT HEADER WITH ERROR', async () => {
    assertCallPatchMethodKo('ERROR');
  });
});

describe('ApiService - post', () => {
  const assertCallPostMethod = async () => {
    axios.post.mockResolvedValue({ data: 'TEST' });

    const test = await ApiService.post(URL, '/test', []);
    expect(test).toBe('TEST');
    expect(axios.post).toBeCalledWith('http://localhost:8090/test', [], { 'Content-Type': 'application/json' });
  };

  const assertCallPostMethodKo = async (message) => {
    axios.post.mockImplementation(() => Promise.reject(message));

    try {
      await ApiService.post(URL, '/test', []);
    } catch (error) {
      expect(error).toBe('ERROR');
    }
    expect(axios.post).toBeCalledWith('http://localhost:8090/test', [], { 'Content-Type': 'application/json' });
  };

  test('HTTP POST WITHOUT HEADER', async () => {
    assertCallPostMethod();
  });

  test('HTTP POST WITHOUT HEADER WITH ERROR', async () => {
    assertCallPostMethodKo('ERROR');
  });
});

describe('ApiService - findBy', () => {
  const assertCallGetMethod = async (orderField, order) => {
    axios.get.mockResolvedValue({ data: 'TEST' });
    const test = await ApiService.findBy(URL, '/test', 'username', 'value', 0, 10, {
      order: orderField ?? 'id',
      orderAsc: order === 'asc',
    });
    expect(test).toBe('TEST');
  };

  const assertCallGetMethodKo = async (message) => {
    axios.get.mockImplementation(() => Promise.reject(message));
    try {
      await ApiService.findBy(URL, '/test', 'username', 'value', 0, 10, {
        order: '',
        orderAsc: order === 'asc',
      });
    } catch (error) {
      expect(error).not.toBeNull();
    }
  };

  test('HTTP GET ', async () => {
    assertCallGetMethod();
    expect(axios.get).toBeCalledWith(
      'http://localhost:8090/test?fields=username%3E%3EidDesc&values=value&first=0&max=10',
    );
  });

  test('HTTP GET ', async () => {
    assertCallGetMethod('name', 'asc');
    expect(axios.get).toBeCalledWith(
      'http://localhost:8090/test?fields=username%3E%3Ename&values=value&first=0&max=10',
    );
  });

  test('HTTP GET ', async () => {
    assertCallGetMethod('name', 'desc');
    expect(axios.get).toBeCalledWith(
      'http://localhost:8090/test?fields=username%3E%3EnameDesc&values=value&first=0&max=10',
    );
  });

  test('HTTP GET WITHOUT HEADER WITH ERROR', async () => {
    assertCallGetMethodKo('ERROR');
  });
});

describe('ApiService - countBy', () => {
  const assertCallGetMethod = async () => {
    axios.get.mockResolvedValue({ data: { count: 5 } });
    const test = await ApiService.countBy(URL, '/test', 'username', 'value', { order: '', orderAsc: true });
    expect(test).toBe(5);
  };

  const assertCallGetMethodKo = async (message) => {
    axios.get.mockImplementation(() => Promise.reject(message));
    try {
      await ApiService.countBy(URL, '/test', 'username', 'value');
    } catch (error) {
      expect(error).toBe('ERROR');
    }
    expect(axios.get).toBeCalledWith('http://localhost:8090/test?fields=username&values=value');
  };

  test('HTTP countBy ', async () => {
    assertCallGetMethod();
    expect(axios.get).toBeCalledWith('http://localhost:8090/test?fields=username&values=value');
  });

  test('HTTP countBy WITHOUT HEADER WITH ERROR', async () => {
    assertCallGetMethodKo('ERROR');
  });
});

describe('ApiService - findById', () => {
  const assertCallGetMethod = async () => {
    axios.get.mockResolvedValue({ data: 'TEST' });
    const test = await ApiService.findById(URL, '/test', '1');
    expect(test).toBe('TEST');
  };

  const assertCallGetMethodKo = async (message) => {
    axios.get.mockImplementation(() => Promise.reject(message));
    try {
      await ApiService.findById(URL, '/test', '1');
    } catch (error) {
      expect(error).toBe('ERROR');
    }
    expect(axios.get).toBeCalledWith('http://localhost:8090/test/1');
  };

  test('HTTP countBy ', async () => {
    assertCallGetMethod();
    expect(axios.get).toBeCalledWith('http://localhost:8090/test/1');
  });

  test('HTTP countBy WITHOUT HEADER WITH ERROR', async () => {
    assertCallGetMethodKo('ERROR');
  });
});

describe('ApiService - delete', () => {
  const assertCallDeleteMethod = async () => {
    const data = { id: 1, data: 'TEST' };
    axios.delete.mockResolvedValue(data);
    const test = await ApiService.delete(URL, '/test', data);
    expect(test).toBe('TEST');
  };

  const assertCallDeleteMethodKo = async (message) => {
    axios.delete.mockImplementation(() => Promise.reject(message));
    try {
      await ApiService.delete(URL, '/test', { id: 1, data: 'TEST' });
    } catch (error) {
      expect(error).toBe('ERROR');
    }
    expect(axios.delete).toBeCalledWith('http://localhost:8090/test');
  };

  test('HTTP delete ', async () => {
    assertCallDeleteMethod();
    expect(axios.delete).toBeCalledWith('http://localhost:8090/test');
  });

  test('HTTP delete WITHOUT HEADER WITH ERROR', async () => {
    assertCallDeleteMethodKo('ERROR');
  });
});

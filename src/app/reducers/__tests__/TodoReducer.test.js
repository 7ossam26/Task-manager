import TodoReducer from '../TodoReducer.jsx';

// Ensure jsdom environment has localStorage

beforeEach(() => {
  localStorage.clear();
});

describe('TodoReducer', () => {
  test('add adds a new todo and saves to localStorage', () => {
    const action = { type: 'add', payload: { title: 'Task', priority: 'high' } };
    const result = TodoReducer([], action);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(expect.objectContaining({ title: 'Task', isCompleted: false, priority: 'high' }));
    expect(JSON.parse(localStorage.getItem('todos'))).toEqual(result);
  });

  test('delete removes todo by id and updates localStorage', () => {
    const initial = [{ id: '1', title: 't', details: '', isCompleted: false, priority: 'medium' }];
    localStorage.setItem('todos', JSON.stringify(initial));
    const action = { type: 'delete', payload: { id: '1' } };
    const result = TodoReducer(initial, action);
    expect(result).toEqual([]);
    expect(JSON.parse(localStorage.getItem('todos'))).toEqual([]);
  });

  test('update modifies todo fields and updates localStorage', () => {
    const initial = [{ id: '1', title: 'Old', details: 'd', isCompleted: false, priority: 'low' }];
    localStorage.setItem('todos', JSON.stringify(initial));
    const action = { type: 'update', payload: { id: '1', title: 'New', details: 'newd', priority: 'high' } };
    const result = TodoReducer(initial, action);
    expect(result[0]).toEqual({ id: '1', title: 'New', details: 'newd', isCompleted: false, priority: 'high' });
    expect(JSON.parse(localStorage.getItem('todos'))).toEqual(result);
  });

  test('get returns todos from localStorage', () => {
    const stored = [{ id: '1', title: 'stored', details: '', isCompleted: false, priority: 'medium' }];
    localStorage.setItem('todos', JSON.stringify(stored));
    const action = { type: 'get' };
    const result = TodoReducer([], action);
    expect(result).toEqual(stored);
  });

  test('get returns empty array when localStorage has no todos key', () => {
    localStorage.removeItem('todos');
    const action = { type: 'get' };
    const result = TodoReducer([], action);
    expect(result).toEqual([]);
  });

  test('throws error for invalid action type', () => {
    expect(() => TodoReducer([], { type: 'invalid' })).toThrow('Invalid action type');
  });
});

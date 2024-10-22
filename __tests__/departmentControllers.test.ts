import { Request, Response } from 'express'
import { db } from '../src/db/config/database'

import { getDepartments, getDepartment } from '../src/controllers/departmentController'

jest.mock('../src/db/config/database', () => ({
  db: {
    any: jest.fn(),
    one: jest.fn(),
    oneOrNone: jest.fn(),
  },
}))

describe("Department Controller", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should Get All Departments' ,async () => {
    const mockDepartments = [
      {
        "id": "920a774e-617a-4a5b-82ea-8205c18eef75",
        "name": "Engineering"
      },
      {
        "id": "cfd90465-28fa-4b9a-be3e-ef2517e987e9",
        "name": "Sales"
      },
      {
        "id": "252fc1e8-aead-45cc-9d7d-e6003897bbf9",
        "name": "Marketing"
      }
    ];
    (db.any as jest.Mock).mockResolvedValueOnce(mockDepartments);

    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() }))
    } as unknown as Response;

    await getDepartments(req, res);

    expect(db.any).toHaveBeenCalledWith('SELECT * FROM department');
    expect(res.json).toHaveBeenCalledWith(mockDepartments);
  })

  it('Should Get Department By ID', async () => {
    const mockDepartment = {
      "id": "920a774e-617a-4a5b-82ea-8205c18eef75",
      "name": "Engineering"
    };
    (db.one as jest.Mock).mockResolvedValueOnce(mockDepartment);

    const req = { params: { id: '920a774e-617a-4a5b-82ea-8205c18eef75' } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() })),
    } as unknown as Response;

    await getDepartment(req, res);

    expect(db.one).toHaveBeenCalledWith('SELECT * FROM department WHERE id = $1', [req.params.id]);
    expect(res.json).toHaveBeenCalledWith(mockDepartment);
  });

});

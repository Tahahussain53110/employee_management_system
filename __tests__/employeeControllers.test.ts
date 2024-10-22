import { Request, Response } from 'express'
import { db } from '../src/db/config/database'

import {
  getUsers,
  getUser,
  updateUser,
  getUserHierarchy,
} from '../src/controllers/employeeController'

jest.mock('../src/db/config/database', () => ({
  db: {
    any: jest.fn(),
    one: jest.fn(),
    oneOrNone: jest.fn(),
  },
}))

describe('Employee Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should Get All Users', async () => {
    const mockEmployees = [
      {
        "id": "46956d54-093b-47c0-9c15-e1c512e0c155",
        "firstname": "Stanley",
        "lastname": "Bergstrom",
        "jobtitle": "Global Creative Strategist",
        "departmentid": "252fc1e8-aead-45cc-9d7d-e6003897bbf9",
        "managerid": "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d"
      },
      {
        "id": "1da7452e-dfe6-4a23-90d5-c926c5cc38d4",
        "firstname": "Tremaine",
        "lastname": "Dicki",
        "jobtitle": "Investor Branding Associate",
        "departmentid": "920a774e-617a-4a5b-82ea-8205c18eef75",
        "managerid": "2798c35b-5b8f-4a5d-9858-0a818d48cbef"
      }
    ];
    (db.any as jest.Mock).mockResolvedValueOnce(mockEmployees);

    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() })),
    } as unknown as Response;

    await getUsers(req, res);

    expect(db.any).toHaveBeenCalledWith('SELECT * FROM employee');
    expect(res.json).toHaveBeenCalledWith(mockEmployees);
  });

  it('Should Get A User By ID', async () => {
    const mockEmployee = {
      "id": "46956d54-093b-47c0-9c15-e1c512e0c155",
      "firstname": "Stanley",
      "lastname": "Bergstrom",
      "jobtitle": "Global Creative Strategist",
      "departmentid": "252fc1e8-aead-45cc-9d7d-e6003897bbf9",
      "managerid": "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d"
    };
    (db.one as jest.Mock).mockResolvedValueOnce(mockEmployee);

    const req = { params: { id: '46956d54-093b-47c0-9c15-e1c512e0c155' } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() })),
    } as unknown as Response;

    await getUser(req, res);

    expect(db.one).toHaveBeenCalledWith('SELECT * FROM employee WHERE id = $1', [req.params.id]);
    expect(res.json).toHaveBeenCalledWith(mockEmployee);
  });

  it('Should Update A User', async () => {
    const mockUpdatedEmployee = {
      "id": "46956d54-093b-47c0-9c15-e1c512e0c155",
      "firstname": "Stanley",
      "lastname": "Bergstrom",
      "jobtitle": "Global Creative Strategist",
      "departmentid": "252fc1e8-aead-45cc-9d7d-e6003897bbf9",
      "managerid": "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d"
    };
    (db.one as jest.Mock).mockResolvedValueOnce(mockUpdatedEmployee);

    const req = {
      params: { id: "46956d54-093b-47c0-9c15-e1c512e0c155" },
      body: {
        updateUserInfo: {
          "firstName": "Hola",
          "lastName": "Bergstrom",
          "jobTitle": "Global Creative Strategist",
          "departmentId": "252fc1e8-aead-45cc-9d7d-e6003897bbf9",
          "managerId": "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d"
        },
      },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() })),
    } as unknown as Response;

    await updateUser(req, res);

    expect(db.one).toHaveBeenCalledWith(
      'UPDATE employee SET id = $1, firstName = $2, lastName = $3, jobTitle = $4, departmentId = $5, managerId = $6 WHERE id = $1 RETURNING *',
      [
        req.params.id,
        req.body.updateUserInfo.firstName,
        req.body.updateUserInfo.lastName,
        req.body.updateUserInfo.jobTitle,
        req.body.updateUserInfo.departmentId,
        req.body.updateUserInfo.managerId,
      ]
    );
    expect(res.json).toHaveBeenCalledWith(mockUpdatedEmployee);
  });

  it('Should Get User Hierarchy', async () => {
    const mockEmployee = {
      "id": "46956d54-093b-47c0-9c15-e1c512e0c155",
      "firstname": "Stanley",
      "lastname": "Bergstrom",
      "jobtitle": "Global Creative Strategist",
      "departmentid": "252fc1e8-aead-45cc-9d7d-e6003897bbf9",
      "managerid": "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d"
    }
    const mockDepartment = {
      "id": "252fc1e8-aead-45cc-9d7d-e6003897bbf9",
      "name": "Marketing"
    };
    const mockManager = {
      "id": "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d",
      "firstname": "Kyle",
      "lastname": "Streich",
      "jobtitle": "Dynamic Branding Orchestrator",
      "departmentid": "aef293ee-8dcc-4d89-99cf-1b8f61bab07b",
      "managerid": "2798c35b-5b8f-4a5d-9858-0a818d48cbef"
    };
    (db.one as jest.Mock).mockResolvedValueOnce(mockEmployee);
    (db.one as jest.Mock).mockResolvedValueOnce(mockDepartment);
    (db.oneOrNone as jest.Mock).mockResolvedValueOnce(mockManager);

    const req = { params: { id: '46956d54-093b-47c0-9c15-e1c512e0c155' } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() })),
    } as unknown as Response;

    await getUserHierarchy(req, res);

    expect(db.one).toHaveBeenNthCalledWith(1, 'SELECT * FROM employee WHERE id = $1', [req.params.id]);
    expect(db.one).toHaveBeenNthCalledWith(2, 'SELECT * FROM department WHERE id = $1', [mockEmployee.departmentid]);
    expect(db.oneOrNone).toHaveBeenCalledWith('SELECT * FROM employee WHERE id = $1', [mockEmployee.managerid]);
    expect(res.json).toHaveBeenCalledWith({
      employee: mockEmployee,
      manager: mockManager,
      department: mockDepartment,
    });
  });
});

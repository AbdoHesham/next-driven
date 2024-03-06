import { BaseURL } from '../config';

export const UOMController = {
  SaveMeasurementUnitsList:
    BaseURL + `/api/Company/MeasurementUnit/SaveMeasurementUnit`,
  GetMeasurementUnitsList:
    BaseURL + `/api/Company/MeasurementUnit/GetMeasurementUnitsList`,
  DeleteMeasurementUnit:
    BaseURL +
    `/api/Company/MeasurementUnit/DeleteMeasurementUnit
`,
  SearchByMeasurementUnitName:
    BaseURL +
    `/api/Company/MeasurementUnit/SearchByMeasurementUnitName
`,
GetMeasurementUnitsForDDL:
BaseURL +
`/api/Company/MeasurementUnit/GetMeasurementUnitsForDDL
`,
GetMeasurementUnitById:
BaseURL +
`/api/Company/MeasurementUnit/GetMeasurementUnitById
`,

};

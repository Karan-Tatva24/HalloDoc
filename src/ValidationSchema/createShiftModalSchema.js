import * as Yup from "yup";

export const createShiftModalSchema = Yup.object().shape({
  searchRegion: Yup.string().required("Region is required"),
  physician: Yup.string().required("Physician is required"),
  shiftDate: Yup.string().required("Shift Date is required"),
  startTime: Yup.string().required("Start Time is required"),
  endTime: Yup.string()
    .required("End Time is required")
    .when("startTime", (startTime, schema) => {
      return schema.test({
        name: "is-greater",
        exclusive: true,
        message: "End time must be greater than start time",
        test: function (endTime) {
          return endTime > startTime;
        },
      });
    }),
  sunday: Yup.boolean(),
  monday: Yup.boolean(),
  tuesday: Yup.boolean(),
  wednesday: Yup.boolean(),
  thursday: Yup.boolean(),
  friday: Yup.boolean(),
  saturday: Yup.boolean(),
  repeatUpto: Yup.string().required("Repeat End is required"),
});

export const viewShiftModalSchema = Yup.object().shape({
  shiftDate: Yup.string().required("Shift Date is required"),
  startTime: Yup.string().required("Start Time is required"),
  endTime: Yup.string()
    .required("End Time is required")
    .when("startTime", (startTime, schema) => {
      return schema.test({
        name: "is-greater",
        exclusive: true,
        message: "End time must be greater than start time",
        test: function (endTime) {
          return endTime > startTime;
        },
      });
    }),
});

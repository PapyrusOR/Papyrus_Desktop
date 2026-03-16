import React from 'react';
import { RangePickerHandle } from './interface';
declare const PickerComponent: React.ForwardRefExoticComponent<import("./interface").BaseRangePickerProps & import("../_util/type").Omit<import("./interface").PickerProps, "onChange" | "onSelect" | "inputProps" | "onOk" | "defaultPickerValue" | "pickerValue" | "onPickerValueChange"> & React.RefAttributes<RangePickerHandle>>;
export default PickerComponent;

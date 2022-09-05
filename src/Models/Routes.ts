import React from "react";
import { RouteComponentProps } from "react-router-dom";

export type Routes = {
    path: string,
    name: string,
    icon: string,
    component: React.FC<RouteComponentProps>,
    layout?: string,
    role?: string
}
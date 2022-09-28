import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Routes } from "../../Domain/Entities/Entities"

export type RouteWithFC = Routes & {
    component: React.FC<RouteComponentProps>
}
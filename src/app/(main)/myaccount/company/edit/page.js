import { EditIcon, ViewAs } from "@/icons";
import { Container } from "@/shared";
import Button from "@/components/shared/button";
import React, { Suspense } from "react";
import profile_pic from "@/assets/profile-pic.png";
import CompanyForm from "./_components/company-form";
import ProductsForm from "./_components/products-form";
import ContactWithBusinessOwner from "./_components/contact-with-business-owner";
import AvailableProducts from "./_components/available-products";
import EditTabs from "./_components/tabs";
import { getDataPreBasic } from "@/services/company";

export default async function Page() {
  return (
      <><h1>Page not found: 404</h1></>
  );
}

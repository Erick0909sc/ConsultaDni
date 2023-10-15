import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import Confetti from "react-confetti";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  dni: Yup.string()
    .matches(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos numéricos")
    .required("Por favor, ingrese el número de DNI"),
});

const Index = () => {
  const [datos, setDatos] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const formik = useFormik({
    initialValues: {
      dni: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const apiUrl = `/api/consultarDNI?dni=${values.dni}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.success) {
          setDatos(data);
          setConfetti(true);
          toast.success("Consulta de DNI realizada con éxito!");
        } else {
          setDatos(null);
          toast.error("No se encontraron datos para el número de DNI ingresado.");
        }
      } catch (error) {
        console.error("Error al obtener datos del API:", error);
        toast.error("Error al obtener datos del API.");
      }
    },
  });

  const handleLimpiar = () => {
    formik.resetForm();
    setDatos(null);
    setConfetti(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {confetti && <Confetti />}
      <h1 className="text-2xl font-semibold mb-4">Ingrese número de DNI:</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="mb-4 flex flex-col items-center"
      >
        <input
          type="text"
          name="dni"
          value={formik.values.dni}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength="8"
          className={`mb-2 rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 ${
            formik.touched.dni && formik.errors.dni ? "border-red-500" : ""
          }`}
        />
        {formik.touched.dni && formik.errors.dni && (
          <p className="text-red-500 text-sm">{formik.errors.dni}</p>
        )}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Buscar
        </button>
        <button
          type="button"
          onClick={handleLimpiar}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300"
        >
          Limpiar
        </button>
      </form>

      {datos && datos.success && (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700 mt-4">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 mt-6 rounded-full shadow-lg"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt={datos.data.nombres}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {datos.data.nombres}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
            {datos.data.apellido_paterno} {datos.data.apellido_materno}
            </span>
          </div>
        </div>
      )}

      {datos && !datos.success && (
        <p className="text-red-500 mt-2">
          No se encontraron datos para el número de DNI ingresado.
        </p>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
};

export default Index;

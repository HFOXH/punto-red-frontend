import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const RechargeForm = ({ onSuccessfulBuy }) => {
  const [suppliersData, setSuppliersData] = useState([]);

  const [formData, setFormData] = useState({
    mobileNumber: '',
    rechargeValue: '',
    selectedSupplier: '',
  });

  const [errors, setErrors] = useState({});

  const url = 'http://localhost:8080';

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(url+'/transaction/suppliers');
      setSuppliersData(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Este campo es obligatorio.';
    } else if (!/^3\d+$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = 'El número debe comenzar con 3 y contener solo números.';
    } else if (formData.mobileNumber.length > 10) {
      newErrors.mobileNumber = 'Máximo 10 dígitos.';
    } else if (formData.mobileNumber.length < 10){
        newErrors.mobileNumber = 'Minimo 10 dígitos.';
    }

    if (!formData.rechargeValue) {
      newErrors.rechargeValue = 'Este campo es obligatorio.';
    } else if (formData.rechargeValue <= 1000) {
      newErrors.rechargeValue = 'El valor debe ser mayor a 1000.';
    } else if (formData.rechargeValue > 100000) {
      newErrors.rechargeValue = 'El valor debe ser menor a 100000.';
    }

    if (!formData.selectedSupplier) {
      newErrors.selectedSupplier = 'Este campo es obligatorio.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data:', formData);
      let data = {
        "cellPhone": formData.mobileNumber,
        "value": parseInt(formData.rechargeValue, 10),
        "supplierId": formData.selectedSupplier
      }
      console.log(data)
      try {
        await axios.post(url+'/transaction/buy', data);
        if (onSuccessfulBuy) {
            onSuccessfulBuy();
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Recarga exitosa!"
              });
          }
      } catch (error) {
        console.error('Error submitting form:', error);
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Ups... ocurrió un error al recargar"
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="card-container max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
            Número de celular
          </label>
          <input
            type="number"
            name="mobileNumber"
            placeholder="Ingrese el número"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.mobileNumber && <p className="text-red-500 text-xs italic">{errors.mobileNumber}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rechargeValue">
            Valor de recarga
          </label>
          <input
            type="number"
            name="rechargeValue"
            placeholder="Ingrese el valor"
            value={formData.rechargeValue}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.rechargeValue && <p className="text-red-500 text-xs italic">{errors.rechargeValue}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectedSupplier">
            Selecciona un proveedor
          </label>
          <select
            name="selectedSupplier"
            value={formData.selectedSupplier}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Seleccione un proveedor</option>
            {suppliersData.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {errors.selectedSupplier && <p className="text-red-500 text-xs italic">{errors.selectedSupplier}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Pagar
        </button>
      </div>
    </form>
  );
};

export default RechargeForm;

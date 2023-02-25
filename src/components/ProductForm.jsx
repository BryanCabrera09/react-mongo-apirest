import React, { useContext, useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from 'primereact/calendar'
import { ProductContext } from "../contexts/ProductContext";

const ProductForm = (props) => {

    const { isVisible, setIsVisible } = props;

    const {
        createProduct, deleteProduct, editProduct, updateProduct
    } = useContext(ProductContext);

    const initialProductState = {
        _id: null,
        nombre: "",
        precio: "",
        fecha_expiracion: null
    };

    const [productData, setProductData] = useState(initialProductState);

    useEffect(() => {
        if (editProduct)
            setProductData(editProduct);
    }, [editProduct]);

    const updateField = (data, field) => {

        setProductData({ ...productData, [field]: data });

        console.log(productData);
    };

    const _deleteProduct = () => {
        if (editProduct) {
            deleteProduct(productData._id);
            setProductData(initialProductState);
        }
        setIsVisible(false);
    };

    const saveProduct = () => {
        if (!editProduct) {
            createProduct(productData);
        } else {
            updateProduct(productData);
        }
        setProductData(initialProductState);
        setIsVisible(false);
    };

    const clearSelected = () => {
        setIsVisible(false);
        setProductData(initialProductState);
    };

    const dialogFooter = (

        <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Eliminar" icon="pi pi-times" onClick={_deleteProduct} />
            <Button label="Guardar" icon="pi pi-check" onClick={saveProduct} />
        </div>
    );

    return (
        <div>
            <Dialog
                visible={isVisible}
                modal={true}
                style={{ width: "420px" }}
                contentStyle={{ overflow: "visible" }}
                header="Detalle del Producto"
                onHide={() => clearSelected()}
                footer={dialogFooter}>

                <div className="p-grid p-fluid">

                    <br />
                    <div className="p-float-label">
                        <InputText
                            value={productData.nombre}
                            onChange={(e) => updateField(e.target.value, "nombre")} />
                        <label>Nombre: </label>
                    </div>

                    <br />
                    <div className="p-float-label">
                        <InputNumber
                            value={productData.precio}
                            onChange={(e) => updateField(e.value, "precio")}
                            mode="currency" currency="USD" />
                        <label>Precio: </label>
                    </div>

                    <br />
                    <div className="p-float-label">
                        <Calendar
                            value={productData.fecha_expiracion && new Date(productData.fecha_expiracion + " ")}
                            onChange={(e) => updateField(e.target.value.toISOString().substring(0, 10), "fecha_expiracion")}
                            dateFormat="yy-mm-dd" />
                        <label>Fecha de Expiracion: </label>
                    </div>
                    <br />
                </div>

            </Dialog>
        </div>
    );
}

export default ProductForm;
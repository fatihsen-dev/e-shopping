import React from "react"
import styles from "./AddressModal.module.scss"
import { IoMdClose } from "react-icons/io"
import { useTranslation } from "react-i18next"
import { Form, Field, Formik } from "formik"
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from "../../stores/hook"
import { loadAddress } from "../../stores/siteSlice/siteSlice"
import { uid } from "uid"

type AdressPropsType = {
  modalIsActive: boolean
  setModalIsActive: any
}

export default function AddressModal({ modalIsActive, setModalIsActive }: AdressPropsType) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { address } = useAppSelector((state) => state.site)

  const initialValues = {
    name: "",
    surname: "",
    city: "",
    district: "",
    phone: "",
    address: "",
  }

  const formSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(34, "Too Long!").required("Required"),
    surname: Yup.string().min(2, "Too Short!").max(34, "Too Long!").required("Required"),
    city: Yup.string().min(3, "Too Short!").max(34, "Too Long!").required("Required"),
    district: Yup.string().min(3, "Too Short!").max(34, "Too Long!").required("Required"),
    address: Yup.string().required("Required"),
    phone: Yup.string()
      .required("Required")
      .min(10, "Too Short!")
      .max(40, "Too Long!")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      ),
  })

  const submitHandle = (values: any, { resetForm }: any) => {
    dispatch(loadAddress([...address, { ...values, id: uid() }]))

    resetForm()
    setModalIsActive(false)
  }

  return (
    <div className={`${styles.modal} ${modalIsActive ? "address-modal-active" : ""}`}>
      <div className={styles.inner}>
        <button onClick={() => setModalIsActive(false)} className={styles.closeBtn}>
          <IoMdClose />
        </button>
        <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={submitHandle}>
          {({ errors, touched }) => (
            <Form>
              <div>
                <div>
                  <label htmlFor="name">Name</label>
                  <Field id="name" name="name" />
                  {errors.name && touched.name ? <span>{errors.name}</span> : null}
                </div>
                <div>
                  <label htmlFor="surname">Surname</label>
                  <Field id="surname" name="surname" />
                  {errors.surname && touched.surname ? <span>{errors.surname}</span> : null}
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="city">City</label>
                  <Field id="city" name="city" />
                  {errors.city && touched.city ? <span>{errors.city}</span> : null}
                </div>
                <div>
                  <label htmlFor="district">District</label>
                  <Field id="district" name="district" />
                  {errors.district && touched.district ? <span>{errors.district}</span> : null}
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="address">Address</label>
                  <Field id="address" as="textarea" name="address" type="email" />
                  {errors.address && touched.address ? <span>{errors.address}</span> : null}
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <Field id="phone" name="phone" type="number" />
                  {errors.phone && touched.phone ? <span>{errors.phone}</span> : null}
                </div>
              </div>
              <button type="submit">{t("addressAddBtn")}</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

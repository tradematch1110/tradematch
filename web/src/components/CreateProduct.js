import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { allCategories, categoriesNames } from "../resourcees/categories";
import SelectCategories from "./SelectCategories";
import { Grid } from "@mui/material";
import { ImageUpload } from "./ImageUpload";

const CreateProduct = () => {
  const initialValues = {
    produectTitle: "",
    descriptions: "",
    condition: "",
    category: "",
    subCategory: "",
    images: [],
    replaceableCategoryNo1: "",
    replaceableSubCategoryNo1: "",
    replaceableCategoryNo2: "",
    replaceableSubCategoryNo2: "",
    replaceableCategoryNo3: "",
    replaceableSubCategoryNo3: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [images, setImages] = useState([]);
  const [subCategoriesNames, setSubCategoriesNames] = useState("");
  const [subCategoriesNames1, setSubCategoriesNames1] = useState("");
  const [subCategoriesNames2, setSubCategoriesNames2] = useState("");
  const [subCategoriesNames3, setSubCategoriesNames3] = useState("");
  const [add2, setAdd2] = useState(false);
  const [add3, setAdd3] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log("formValues: ", formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    images ? (formValues.images = images) : (formValues.images = []);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log("formValues: ", formValues);
    console.log("isSubmit: ",  isSubmit);
  };

  useEffect(() => {
    console.log("formErrors: ", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("form is valid!!!!");

      // fetch to server

      
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.produectTitle) {
      errors.produectTitle = "שדה חובה";
    } else if (values.produectTitle.length < 2) {
      errors.produectTitle = "מינימום 2 תווים";
    }
    if (!values.descriptions) {
      errors.descriptions = "שדה חובה";
    } else if (values.descriptions.length < 2) {
      errors.descriptions = "מינימום 2 תווים";
    }
    if (!values.condition) {
      errors.condition = "שדה חובה";
    } else if (values.condition.length < 2) {
      errors.condition = "מינימום 2 תווים";
    }

    if (!values.images) {
      errors.images = "שדה חובה";
    }
    if (!values.category) {
      errors.category = "שדה חובה";
    }
    if (!values.subCategory) {
      errors.subCategory = "שדה חובה";
    }
    if (!values.replaceableCategoryNo1) {
      errors.replaceableCategoryNo1 = "שדה חובה";
    }
    if (!values.replaceableSubCategoryNo1) {
      errors.replaceableSubCategoryNo1 = "שדה חובה";
    }

    if(add2){
        if (!values.replaceableCategoryNo2) {
          errors.replaceableCategoryNo2 = "שדה חובה";
        }
        if (!values.replaceableSubCategoryNo2) {
          errors.replaceableSubCategoryNo2 = "שדה חובה";
        }

    }
    if (add3) {
      if (!values.replaceableCategoryNo3) {
        errors.replaceableCategoryNo3 = "שדה חובה";
      }
      if (!values.replaceableSubCategoryNo3) {
        errors.replaceableSubCategoryNo3 = "שדה חובה";
      }
    }
    return errors;
  };

  const handleCategory = (value) => {
    console.log("handleCategory :", value);
    allCategories.find((subCategory) => {
      if (subCategory.name === value) {
        //  console.log(subCategory.subCategories);
        setSubCategoriesNames(subCategory.subCategories);
      }
    });
  };
  const handleReplaceableCategoryNo1 = (value) => {
    console.log("handleCategory :", value);
    allCategories.find((subCategory) => {
      if (subCategory.name === value) {
        //  console.log(subCategory.subCategories);
        setSubCategoriesNames1(subCategory.subCategories);
      }
    });
  };
  const handleReplaceableCategoryNo2 = (value) => {
    console.log("handleCategory :", value);
    allCategories.find((subCategory) => {
      if (subCategory.name === value) {
        //  console.log(subCategory.subCategories);
        setSubCategoriesNames2(subCategory.subCategories);
      }
    });
  };
//handleReplaceableCategoryNo3
const handleReplaceableCategoryNo3 = (value) => {
  console.log("handleCategory :", value);
  allCategories.find((subCategory) => {
    if (subCategory.name === value) {
      //  console.log(subCategory.subCategories);
      setSubCategoriesNames3(subCategory.subCategories);
    }
  });
};
  return (
    <Grid direction="column" container item xs={12} md={6}>
      <div className="create">
        <h2>המוצר שלך</h2>

        <form onSubmit={handleSubmit}>
          <label>שם המוצר</label>
          <input
            type="text"
            placeholder="שם המוצר"
            name="produectTitle"
            value={formValues.produectTitle}
            onChange={handleChange}
          />
          <p>{formErrors.produectTitle}</p>
          <label>תאור המוצר</label>
          <textarea
            placeholder="תאור המוצר"
            name="descriptions"
            value={formValues.descriptions}
            onChange={handleChange}
          ></textarea>
          <p>{formErrors.descriptions}</p>
          <label>מצב המוצר</label>
          <input
            type="text"
            name="condition"
            placeholder="מצב המוצר"
            value={formValues.condition}
            onChange={handleChange}
          />
          <p>{formErrors.condition}</p>
          <div>
            <label> תמונת המוצר</label>
            <ImageUpload setImages={setImages} />
          </div>
          <div className="optionWrapper">
            <h3> איפיון המוצר</h3>
            <label> קטגוריה ראשית</label>

            <select
              name="category"
              placeholder="קטגוריה ראשית"
              value={formValues.category}
              onChange={handleChange}
              onClick={(e) => handleCategory(e.target.value)}
            >
              <option value="" disabled>
                קטגוריה ראשית
              </option>

              {categoriesNames.map((category, pos) => {
                return (
                  <option value={category} key={pos}>
                    {category}
                  </option>
                );
              })}
            </select>
            <p>{formErrors.category}</p>

            {subCategoriesNames && (
              <div>
                <label>קטגוריה משנית</label>
                <select
                  name="subCategory"
                  placeholder=" תת קטגוריה ראשית"
                  value={formValues.subCategory}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    קטגוריה משנית
                  </option>

                  {subCategoriesNames.map((category, pos) => {
                    return (
                      <option value={category} key={pos}>
                        {category}
                      </option>
                    );
                  })}
                </select>
                <p>{formErrors.subCategory}</p>
              </div>
            )}
          </div>
          <div className="optionWrapper">
            <h3>1 המוצר הרצוי</h3>

            <label> קטגוריה ראשית להחלפה</label>
            <select
              name="replaceableCategoryNo1"
              placeholder=" קטגוריה ראשית להחלפה"
              value={formValues.replaceableCategoryNo1}
              onChange={handleChange}
              onClick={(e) => handleReplaceableCategoryNo1(e.target.value)}
            >
              <option value="" disabled>
                קטגוריה ראשית להחלפה{" "}
              </option>

              {categoriesNames.map((category, pos) => {
                return (
                  <option value={category} key={pos}>
                    {category}
                  </option>
                );
              })}
            </select>
            <p>{formErrors.replaceableCategoryNo1}</p>
            {subCategoriesNames1 && (
              <div>
                <label> תת קטגוריה משנית להחלפה</label>
                <select
                  name="replaceableSubCategoryNo1"
                  placeholder=" תת קטגוריה ראשית"
                  value={formValues.replaceableSubCategoryNo1}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    קטגוריה משנית להחלפה
                  </option>

                  {subCategoriesNames1.map((category, pos) => {
                    return (
                      <option value={category} key={pos}>
                        {category}
                      </option>
                    );
                  })}
                </select>
                <p>{formErrors.replaceableSubCategoryNo1}</p>
              </div>
            )}
          </div>
          {!add2 && (
            <button onClick={() => setAdd2(true)}>הוסף אפשרות החלפה</button>
          )}{" "}
          {add2 && (
            <div className="optionWrapper">
              <h3>2 המוצר הרצוי</h3>
              <label> קטגוריה ראשית להחלפה</label>
              <select
                name="replaceableCategoryNo2"
                placeholder=" קטגוריה ראשית להחלפה"
                value={formValues.replaceableCategoryNo2}
                onChange={handleChange}
                onClick={(e) => handleReplaceableCategoryNo2(e.target.value)}
              >
                <option value="" disabled>
                  קטגוריה ראשית להחלפה{" "}
                </option>

                {categoriesNames.map((category, pos) => {
                  return (
                    <option value={category} key={pos}>
                      {category}
                    </option>
                  );
                })}
              </select>
              <p>{formErrors.replaceableCategoryNo2}</p>
              {subCategoriesNames2 && (
                <div>
                  <label> תת קטגוריה משנית להחלפה</label>
                  <select
                    name="replaceableSubCategoryNo2"
                    placeholder=" תת קטגוריה ראשית"
                    value={formValues.replaceableSubCategoryNo2}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      קטגוריה משנית להחלפה
                    </option>

                    {subCategoriesNames2.map((category, pos) => {
                      return (
                        <option value={category} key={pos + "" + 1}>
                          {category}
                        </option>
                      );
                    })}
                  </select>
                  <p>{formErrors.replaceableSubCategoryNo2}</p>
                </div>
              )}
            </div>
          )}
          <br></br>
          {add2 && (
            <div>
              <button
                onClick={() => {
                  setAdd2(false);
                  formValues.replaceableCategoryNo2 = "";
                  formValues.replaceableSubCategoryNo2 = "";
                  handleSubmit();
                }}
              >
                הסר אפשרות החלפה
              </button>
              <button onClick={() => setAdd3(true)}>הוסף אפשרות החלפה</button>
            </div>
          )}{" "}
          <br></br>
          {add3 && (
            <div className="optionWrapper">
              <h3>3 המוצר הרצוי</h3>
              <label> קטגוריה ראשית להחלפה</label>
              <select
                name="replaceableCategoryNo3"
                placeholder=" קטגוריה ראשית להחלפה"
                value={formValues.replaceableCategoryNo3}
                onChange={handleChange}
                onClick={(e) => handleReplaceableCategoryNo3(e.target.value)}
              >
                <option value="" disabled>
                  קטגוריה ראשית להחלפה{" "}
                </option>

                {categoriesNames.map((category, pos) => {
                  return (
                    <option value={category} key={pos}>
                      {category}
                    </option>
                  );
                })}
              </select>
              <p>{formErrors.replaceableCategoryNo3}</p>
              {subCategoriesNames3 && (
                <div>
                  <label> תת קטגוריה משנית להחלפה</label>
                  <select
                    name="replaceableSubCategoryNo3"
                    placeholder=" תת קטגוריה ראשית"
                    value={formValues.replaceableSubCategoryNo3}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      קטגוריה משנית להחלפה
                    </option>

                    {subCategoriesNames3.map((category, pos) => {
                      return (
                        <option value={category} key={pos + "" + 1}>
                          {category}
                        </option>
                      );
                    })}
                  </select>
                  <p>{formErrors.replaceableSubCategoryNo3}</p>
                </div>
              )}
            </div>
          )}
          <br></br>
          {add3 && (
            <div>
              <button
                onClick={() => {
                  setAdd3(false);
                  formValues.replaceableCategoryNo3 = "";
                  formValues.replaceableSubCategoryNo3 = "";
                  handleSubmit();
                }}
              >
                הסר אפשרות החלפה
              </button>
              <button onClick={() => setAdd3(true)}>הוסף אפשרות החלפה</button>
            </div>
          )}{" "}
          <br></br>
          <button>הוסף</button>
        </form>
      </div>
    </Grid>
  );
};

export default CreateProduct;

// <SelectCategories
//   mainLabel="קטגורית משנית להחלפה"
//   categoriesNames={categoriesNames}
//   subLabel="תת קתגוריה משנית להחלפה"
//   setReplaceableCategory={setReplaceableCategory}
//   setRreplaceableSubCategory={setRreplaceableSubCategory}
// />

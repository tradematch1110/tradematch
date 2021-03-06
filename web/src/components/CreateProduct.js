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
      errors.produectTitle = "?????? ????????";
    } else if (values.produectTitle.length < 2) {
      errors.produectTitle = "?????????????? 2 ??????????";
    }
    if (!values.descriptions) {
      errors.descriptions = "?????? ????????";
    } else if (values.descriptions.length < 2) {
      errors.descriptions = "?????????????? 2 ??????????";
    }
    if (!values.condition) {
      errors.condition = "?????? ????????";
    } else if (values.condition.length < 2) {
      errors.condition = "?????????????? 2 ??????????";
    }

    if (!values.images) {
      errors.images = "?????? ????????";
    }
    if (!values.category) {
      errors.category = "?????? ????????";
    }
    if (!values.subCategory) {
      errors.subCategory = "?????? ????????";
    }
    if (!values.replaceableCategoryNo1) {
      errors.replaceableCategoryNo1 = "?????? ????????";
    }
    if (!values.replaceableSubCategoryNo1) {
      errors.replaceableSubCategoryNo1 = "?????? ????????";
    }

    if(add2){
        if (!values.replaceableCategoryNo2) {
          errors.replaceableCategoryNo2 = "?????? ????????";
        }
        if (!values.replaceableSubCategoryNo2) {
          errors.replaceableSubCategoryNo2 = "?????? ????????";
        }

    }
    if (add3) {
      if (!values.replaceableCategoryNo3) {
        errors.replaceableCategoryNo3 = "?????? ????????";
      }
      if (!values.replaceableSubCategoryNo3) {
        errors.replaceableSubCategoryNo3 = "?????? ????????";
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
        <h2>?????????? ??????</h2>

        <form onSubmit={handleSubmit}>
          <label>???? ??????????</label>
          <input
            type="text"
            placeholder="???? ??????????"
            name="produectTitle"
            value={formValues.produectTitle}
            onChange={handleChange}
          />
          <p>{formErrors.produectTitle}</p>
          <label>???????? ??????????</label>
          <textarea
            placeholder="???????? ??????????"
            name="descriptions"
            value={formValues.descriptions}
            onChange={handleChange}
          ></textarea>
          <p>{formErrors.descriptions}</p>
          <label>?????? ??????????</label>
          <input
            type="text"
            name="condition"
            placeholder="?????? ??????????"
            value={formValues.condition}
            onChange={handleChange}
          />
          <p>{formErrors.condition}</p>
          <div>
            <label> ?????????? ??????????</label>
            <ImageUpload setImages={setImages} />
          </div>
          <div className="optionWrapper">
            <h3> ???????????? ??????????</h3>
            <label> ?????????????? ??????????</label>

            <select
              name="category"
              placeholder="?????????????? ??????????"
              value={formValues.category}
              onChange={handleChange}
              onClick={(e) => handleCategory(e.target.value)}
            >
              <option value="" disabled>
                ?????????????? ??????????
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
                <label>?????????????? ??????????</label>
                <select
                  name="subCategory"
                  placeholder=" ???? ?????????????? ??????????"
                  value={formValues.subCategory}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    ?????????????? ??????????
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
            <h3>1 ?????????? ??????????</h3>

            <label> ?????????????? ?????????? ????????????</label>
            <select
              name="replaceableCategoryNo1"
              placeholder=" ?????????????? ?????????? ????????????"
              value={formValues.replaceableCategoryNo1}
              onChange={handleChange}
              onClick={(e) => handleReplaceableCategoryNo1(e.target.value)}
            >
              <option value="" disabled>
                ?????????????? ?????????? ????????????{" "}
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
                <label> ???? ?????????????? ?????????? ????????????</label>
                <select
                  name="replaceableSubCategoryNo1"
                  placeholder=" ???? ?????????????? ??????????"
                  value={formValues.replaceableSubCategoryNo1}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    ?????????????? ?????????? ????????????
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
            <button onClick={() => setAdd2(true)}>???????? ???????????? ??????????</button>
          )}{" "}
          {add2 && (
            <div className="optionWrapper">
              <h3>2 ?????????? ??????????</h3>
              <label> ?????????????? ?????????? ????????????</label>
              <select
                name="replaceableCategoryNo2"
                placeholder=" ?????????????? ?????????? ????????????"
                value={formValues.replaceableCategoryNo2}
                onChange={handleChange}
                onClick={(e) => handleReplaceableCategoryNo2(e.target.value)}
              >
                <option value="" disabled>
                  ?????????????? ?????????? ????????????{" "}
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
                  <label> ???? ?????????????? ?????????? ????????????</label>
                  <select
                    name="replaceableSubCategoryNo2"
                    placeholder=" ???? ?????????????? ??????????"
                    value={formValues.replaceableSubCategoryNo2}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      ?????????????? ?????????? ????????????
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
                ?????? ???????????? ??????????
              </button>
              <button onClick={() => setAdd3(true)}>???????? ???????????? ??????????</button>
            </div>
          )}{" "}
          <br></br>
          {add3 && (
            <div className="optionWrapper">
              <h3>3 ?????????? ??????????</h3>
              <label> ?????????????? ?????????? ????????????</label>
              <select
                name="replaceableCategoryNo3"
                placeholder=" ?????????????? ?????????? ????????????"
                value={formValues.replaceableCategoryNo3}
                onChange={handleChange}
                onClick={(e) => handleReplaceableCategoryNo3(e.target.value)}
              >
                <option value="" disabled>
                  ?????????????? ?????????? ????????????{" "}
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
                  <label> ???? ?????????????? ?????????? ????????????</label>
                  <select
                    name="replaceableSubCategoryNo3"
                    placeholder=" ???? ?????????????? ??????????"
                    value={formValues.replaceableSubCategoryNo3}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      ?????????????? ?????????? ????????????
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
                ?????? ???????????? ??????????
              </button>
              <button onClick={() => setAdd3(true)}>???????? ???????????? ??????????</button>
            </div>
          )}{" "}
          <br></br>
          <button>????????</button>
        </form>
      </div>
    </Grid>
  );
};

export default CreateProduct;

// <SelectCategories
//   mainLabel="?????????????? ?????????? ????????????"
//   categoriesNames={categoriesNames}
//   subLabel="???? ?????????????? ?????????? ????????????"
//   setReplaceableCategory={setReplaceableCategory}
//   setRreplaceableSubCategory={setRreplaceableSubCategory}
// />

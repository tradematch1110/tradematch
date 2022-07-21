import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { Formik, Form } from "formik";
import { registerNewUser } from "../services/api";
// import CircularIndeterminate from "./common/Circular";
import { Grid, Hidden } from "@mui/material";
import Textfield from "./TextFeild/index1";
import Button from "./Button";
// import { useHistory, useLocation } from "react-router";
import { RegisterFormCss } from "./RegisterFormCss";
import { authContext } from "../contexts/AuthContext";
// import { Link } from "react-router-dom";
import MainLogo from "./../images/MainLogo";
import { FORM_PRODUCT_VALIDATION } from "./../validationService/Yupvalidation";
import "../App.css";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import { useNavigate } from "react-router-dom";
import Select from "../FormsUI/Select";
import { getCategoriesNames } from './../services/api';
import { useTradeContext } from "../hooks/useTradeContext";
const cacheLtr = createCache({
  key: "muiltr",
});

const cacheRtl = createCache({
  key: "muirtl",
  // prefixer is the only stylis plugin by default, so when
  // overriding the plugins you need to include it explicitly
  // if you want to retain the auto-prefixing behavior.
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrTheme = createTheme({ direction: "ltr" });
const rtlTheme = createTheme({ direction: "rtl" });

// css style to the form
const useStyles = RegisterFormCss;
// Configure JSS

// initial the formik form values for the register form
const INITIAL_FORM_STATE = {
  produectTitle: "",
  images: "",
  descriptions: "",
  category: "",
  subCategory: "",
  condition: "",
  replaceableCategory: "",
  replaceableSubCategory: "",
};

/// ---------------------------------- LoginFormM component-----------------------------
const ProductForm = () => {
  
  const [isRtl, setIsRtl] = useState(true);
  useLayoutEffect(() => {
    document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
  }, [isRtl]);

  const classes = useStyles();

  // initialize context

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // initialize validation

  // initialize form values
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    produectTitle: "",
    descriptions: "",
    category: "",
    subCategory: "",
    condition: "",
    images: "",
    replaceableCategory: "",
    replaceableSubCategory: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { currentUserName, setCurrentUserName, isLogged, setIsLogged } =
    useContext(authContext);
//  const [categoriesNames, setCategoriesNames] = useState("");
  const {categories,dispatch} =useTradeContext()
 useEffect( () => {
  //  async function fetchData() {
  //    const res = await getCategoriesNames();
  //    const json=await res.json()
  //    console.log("res: ", res);
  //    switch (res.statusId) {
  //      case 1:
  //       dispatch({type: 'SET_CATEGORIES', payload: json})
  //       //  setCategoriesNames(res.value.categoriesNames);
  //       //  console.log(res.value.categoriesNames);
        
  //        break;
  //      case 2:
  //        setError(res.value);
  //        setTimeout(() => {
  //          setError("");
  //        }, 5000);
  //        break;
  //      default:
  //    }
  //  }
   async function fetchData() {
    const res = await getCategoriesNames();
    console.log("res: ", res);
    switch (res.statusId) {
      case 1:
        // setCategoriesNames(res.value.categoriesNames);
        dispatch({type: 'SET_CATEGORIES', payload: res.value})
        console.log(res.value.categoriesNames);
        break;
      case 2:
        setError(res.value);
        setTimeout(() => {
          setError("");
        }, 5000);
        break;
      default:
    }
  }
   
    fetchData();
 }, [dispatch]);
  // route consts
  //   const history = useHistory();
  //   const location = useLocation();
  // DB function //////////////////////////////////////////////////////////////////

  // send User Info To DB
  // handle Submit - register form
  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    // const res = await registerNewUser(values);
    // console.log(res);
    // switch (res.statusId) {
    //   case 1:
    //     setFormValues(values);
    //     setIsLogged(true);
    //     setCurrentUserName(values.firstName);
    //     navigate("/");
    //     setLoading(false);
    //     break;
    //   case 2:
    //     setLoading(false);
    //     setIsLogged(false);
    //     setCurrentUserName(undefined);
    //     setError(res.value);
    //     setTimeout(() => {
    //       setError("");
    //     }, 5000);

    //     break;
    //   default:
    // }
  };
  // handle Submit - code form

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
        <CssBaseline />
        {categories &&(
        <Grid
          className="formWrapper"
          container
          direction="row"
          maxwidth="xs"
          item
          justifyContent="center"
        >
          <Grid direction="column" container item xs={12} md={6}>
            <Grid direction="row" container justifyContent="center">
              {/* <Link to="/">
            <Hidden smDown>
              <MainLogo
                width={192}
                height={33}
                //   className={classes.logoMobile}
              />
            </Hidden>
            <Hidden smUp>
              <MainLogo
                width={145}
                height={25}
                //   className={classes.logoMobile}
              />
            </Hidden>
          </Link> */}
            </Grid>
            {/* {loading && !error} */}
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_PRODUCT_VALIDATION}
              onSubmit={(values, onSubmitProps) => {
                handleSubmit(values, onSubmitProps);
              }}
            >
              <Form>
                <Grid container item xs={12}>
                  <Hidden smUp>
                    <Grid
                      dir="column"
                      container
                      item
                      xs={12}
                      md={6}
                      justifyContent="center"
                      className={classes.image}
                    ></Grid>
                  </Hidden>
                  <Grid container item xs={12} justifyContent="center">
                    <p className={classes.title} />
                  </Grid>
                  {error && (
                    <Grid
                      className="input"
                      item
                      xs={12}
                      justifyContent="center"
                    >
                      {/* <h1 className={classes.errorMassage}>{error}</h1>{" "} */}
                      <h1>{error}</h1>{" "}
                    </Grid>
                  )}
                  <Grid
                    direction="row"
                    container
                    justifyContent="center"
                    item
                    className="input"
                    xs={12}
                  >
                    <Grid item xs={12} className="input">
                      {" "}
                      <Textfield name="produectTitle" label="שם המוצר" />
                    </Grid>
                  </Grid>
                  <Grid
                    direction="row"
                    container
                    justifyContent="center"
                    className="input"
                    item
                    xs={12}
                  >
                    {/* <Gr> */}
                    <Grid item xs={12} className="input">
                      <Textfield name="descriptions" label="תאור" />
                    </Grid>{" "}
                  </Grid>
                  <Grid
                    direction="row"
                    container
                    justifyContent="center"
                    className="input"
                    item
                    xs={12}
                  >
                    {/* <Gr> */}
                    <Grid item xs={12} className="input">
                      <Textfield name="condition" label="מצב" />
                    </Grid>{" "}
                  </Grid>
                  <Grid
                    direction="row"
                    container
                    justifyContent="center"
                    className="input"
                    item
                    xs={12}
                  >
                    {
                    <Grid item xs={12} className="input">
                      <Select
                        name="category"
                        label="קטגוריה ראשית"
                        options={categories.categoriesNames  }
                      ></Select>
                    </Grid>}
                  </Grid>
                  <Grid
                    direction="row"
                    container
                    justifyContent="center"
                    className="input"
                    item
                    xs={12}
                  >
                    <Grid item xs={12} className="input">
                      <Select
                        name="category"
                        label="קטגוריה משנית"
                        options={["חמור", "שזלון"]}
                      ></Select>
                    </Grid>
                  </Grid>

                  <Grid
                    direction="row"
                    container
                    justifyContent="center"
                    className="input"
                    item
                    xs={12}
                  >
                    <Grid item xs={12} className="input">
                      <Select
                        name="replaceableCategory"
                        label="קטגוריה ראשית להחלפה"
                        options={categories.categoriesNames   }
                      ></Select>
                    </Grid>
                  </Grid>
                  <Grid
                    direction="row"
                    container
                    justifyContent="center"
                    className="input"
                    item
                    xs={12}
                  >
                    {/* <Gr> */}
                    <Grid item xs={12} className="input">
                      <Select
                        name="replaceableSubCategory"
                        label="קטגוריה משנית להחלפה"
                        options={["חמור", "שזלון"]}
                      ></Select>
                    </Grid>
                  </Grid>
                  <Grid
                    //   className={classes.btnWrapper}
                    container
                    item
                    xs={12}
                    alignItems="center"
                    justifyContent="center"
                    // style={{ minHeight: '10vh' }}
                  >
                    <Button error={error}>נקסט</Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
          </Grid>
        )}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ProductForm;

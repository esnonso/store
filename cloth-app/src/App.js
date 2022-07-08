import { Fragment, useContext, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Main from "./components/layout/Main";
import LoadingSpinner from "./components/UI/Loader/loadingSpinner";

import CartContextProvider from "./context-store/CartContextProvider";
import AuthContext from "./context-store/auth-context";

import Home from "./homepage/cloth";

const Checkout = lazy(() => import("./components/checkout/Checkout"));
const ClothForm = lazy(() => import("./components/admin/clothForm"));
const Cart = lazy(() => import("./components/cart/Cart"));
const UserProfile = lazy(() => import("./components/user-profile/user"));
const ViewCloth = lazy(() => import("./components/clothes/viewCloth"));
const ClothesCategory = lazy(() => import("./components/categories/category"));

const ClothesCategoriesList = lazy(() =>
  import("./components/clothes/categoryList/category")
);

const Profile = lazy(() => import("./components/user-profile/profile"));
const Orders = lazy(() => import("./components/user-profile/order"));

const VerifyEmail = lazy(() => import("./components/auth/verifyEmail"));
const RecoverAccount = lazy(() => import("./components/auth/accountRecovery"));
const ChangePassword = lazy(() => import("./components/auth/changePassword"));
const PageNotFound = lazy(() => import("./components/notFound/notFound"));

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <CartContextProvider>
      <Main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="products/female"
              element={<ClothesCategory female={true} />}
            />

            <Route path="products/male" element={<ClothesCategory />} />

            <Route
              path="products/male/:category"
              element={<ClothesCategoriesList />}
            />

            <Route
              path="products/female/:category"
              element={<ClothesCategoriesList female={true} />}
            />

            <Route path="products/:title/:productId" element={<ViewCloth />} />

            {authCtx.admin ? (
              <Fragment>
                <Route
                  path=":productId/edit"
                  element={<ClothForm isEditing={true} />}
                />
                <Route path="products/new" element={<ClothForm />} />
              </Fragment>
            ) : (
              <Route path="*" element={<PageNotFound />} />
            )}

            <Route path="cart" element={<Cart />} />

            {authCtx.isLoggedIn && (
              <Route path="checkout" element={<Checkout />} />
            )}

            {authCtx.isLoggedIn === true ? (
              <Route path="/user/:id" element={<UserProfile />}>
                <Route index element={<Navigate to="profile" />} />
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            ) : (
              <Route path="*" element={<PageNotFound />} />
            )}

            <Route
              path="confirm-email/:confirmationCode"
              element={<VerifyEmail />}
            />

            <Route path="recover-account" element={<RecoverAccount />} />

            <Route path="change-password/:token" element={<ChangePassword />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Main>
    </CartContextProvider>
  );
}

export default App;

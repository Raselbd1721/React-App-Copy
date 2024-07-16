
const NavBarData=[
  {
    mainHeading:"Home",
    link:"/home",
  },
  {
    mainHeading:"About",
    link:"/about",
  },
  {
 mainHeading:"Orders",
 link:"/orders",
    subHeading:[{name:"Show Orders",link:"/orders"},{name:"Delete Orders",link:"/orders"},{name:"Update Orders",link:"/orders"}]
  },
  {
    mainHeading:"CART",
    link:"/cart",
  },
  {
    mainHeading:"login/logout",
    link:"/userlogin",
    subHeading:[{name:"Login",link:"/login"},{name:"LogOut",link:"/login"}]
  },
  {
    mainHeading:"Categories",
    link:"/category",
    subHeading:[{name:"create Category",link:"/category"},{name:"Delete Category",link:"/category"},{name:"Update Category",link:"/category"}]
  },
  {
    mainHeading:"Products",
    link:"/products",
    subHeading:[{name:"Create Product",link:"/products"},{name:"Delete Product",link:"/products"},{name:"Update Product",link:"/products"}]
  },
  {
    mainHeading:"Users",
    link:"/users",
    subHeading:[{name:"Create User",link:"/users"},{name:"Delete User",link:"/users"},{name:"Update User",link:"/users"}]
  },
  ]
  
  export default NavBarData
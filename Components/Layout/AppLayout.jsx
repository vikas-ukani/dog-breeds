import Header from "Components/Header";

const AppLayout = ({ children }) => {
  return (
    <div className={""}>
      <Header />
      <div className="bg-slate-100 min-h-screen ">
        {children}
      </div>
    </div>
  )
}

export default AppLayout;
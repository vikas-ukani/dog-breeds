import Header from "Components/Header";

const AppLayout = ({ children }) => {
  return (
    <div id="app-layout" className={""}>
      <Header />
      <div className="bg-slate-100 min-h-screen ">
        {children}
      </div>
    </div>
  )
}

export default AppLayout;
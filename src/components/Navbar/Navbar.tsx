import React from "react"
import styles from "./Navbar.module.scss"
import { NavLink } from "react-router-dom"
import { CgShoppingCart } from "react-icons/cg"
import { FiHeart } from "react-icons/fi"
import { BsFillSunFill, BsMoonFill } from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../stores/hook"
import { changeTheme } from "../../stores/siteSlice/siteSlice"
import { Menu } from "@headlessui/react"

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { darkMode } = useAppSelector((state) => state.site)
  const dispatch = useAppDispatch()

  const langHandle = () => {
    i18n.changeLanguage(i18n.language === "en" ? "tr" : "en")
    localStorage.setItem("lang", i18n.language)
  }

  const ThemeHandle = () => {
    dispatch(changeTheme(!darkMode))
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <h2 className={styles.logo}>
          <NavLink to="/">E-Shopping</NavLink>
        </h2>
        <div className={styles.menu}>
          <ul>
            <li>
              <NavLink to="/favorites">
                <FiHeart />
                <span>{t("favorites")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                <CgShoppingCart />
                <span>{t("cart")}</span>
              </NavLink>
            </li>
          </ul>
          <div className={styles.buttons}>
            <button onClick={langHandle}>{i18n.language === "en" ? <span>TR</span> : <span>EN</span>}</button>
            <button onClick={ThemeHandle}>{darkMode ? <BsFillSunFill className={styles.sunIcon} /> : <BsMoonFill />}</button>
            <div className={styles.btnMenu}>
              <Menu>
                <Menu.Button>
                  <FaUserAlt />
                </Menu.Button>
                <Menu.Items className={styles.list}>
                  <Menu.Item>
                    <NavLink to="/account">
                      <span>{t("account")}</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item>
                    <NavLink to="/favorites">
                      <span>{t("favorites")}</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item>
                    <NavLink to="/cart">
                      <span>{t("cart")}</span>
                    </NavLink>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

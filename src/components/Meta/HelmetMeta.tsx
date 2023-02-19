import React from "react"
import { Helmet } from "react-helmet"

export default function HelmetMeta({ title }: { title: string }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="keywords" content="Stichwort 1, Stichwort 2, Stichwort 3" />
    </Helmet>
  )
}

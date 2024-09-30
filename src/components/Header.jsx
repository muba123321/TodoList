import React from "react";

export default function TopHeader() {
  return (
    <div
      className="top-header"
      style={{
        width: "100%",
        height: 50,
        backgroundColor: "#f7f7f7",
        display: "flex",
        justifyContent: "Center",
        alignItems: "center",
        padding: 20,
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 16,
      }}
    >
      Todo List
    </div>
  );
}

type OgImageProps = {
  title: string;
  subtitle: string;
  footer: string;
};

export function OgImage({ title, subtitle, footer }: OgImageProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        background: "linear-gradient(135deg, #fff7d6 0%, #fef3c7 38%, #93c5fd 100%)",
        color: "#111827",
        fontFamily: '"Arial", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
        padding: "44px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          border: "6px solid #111827",
          background: "#fffdf5",
          boxShadow: "16px 16px 0 #111827",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(90deg, #1d4ed8 0%, #60a5fa 100%)",
            color: "#ffffff",
            padding: "18px 24px",
            borderBottom: "6px solid #111827",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            교수님 확인 부탁드립니다.exe
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={titleButtonStyle}>-</div>
            <div style={titleButtonStyle}>O</div>
            <div style={titleButtonStyle}>X</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "34px 38px 36px",
            gap: "28px",
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", flex: 1.15 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                border: "4px solid #111827",
                background: "#facc15",
                padding: "10px 16px",
                fontSize: 24,
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              대학생용 공감형 패러디 유틸리티
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 66,
                lineHeight: 1.08,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                marginBottom: "18px",
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 29,
                lineHeight: 1.45,
                color: "#334155",
                fontWeight: 600,
                maxWidth: "700px",
              }}
            >
              {subtitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "340px",
              border: "6px solid #ffffff",
              background: "#1d4ed8",
              color: "#ffffff",
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 34, fontStyle: "italic", fontWeight: 700, lineHeight: 1.3 }}>
                “교수님, 제 파일이... 안 열린다고요?”
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "18px",
                  fontSize: 20,
                  lineHeight: 1.5,
                  color: "#dbeafe",
                }}
              >
                과제 마감 직전, 절박한 대학생의 골든타임을 벌어주는 레트로 생존 전략 도구.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontSize: 20,
                color: "#fde68a",
                fontWeight: 700,
              }}
            >
              <div style={{ display: "flex" }}>- 브라우저 내 즉시 생성</div>
              <div style={{ display: "flex" }}>- 다양한 오피스 확장자 지원</div>
              <div style={{ display: "flex" }}>- 10KB ~ 50MB 용량 설정</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "6px solid #111827",
            background: "#f8fafc",
            padding: "18px 26px",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex", color: "#0f172a" }}>{footer}</div>
          <div style={{ display: "flex", color: "#dc2626" }}>SPONSORED · 🎁기프투데이</div>
        </div>
      </div>
    </div>
  );
}

const titleButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "34px",
  height: "28px",
  border: "3px solid #111827",
  background: "#f8fafc",
  color: "#111827",
  fontSize: 16,
  fontWeight: 700,
} as const;

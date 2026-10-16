# ARA AI PLAY - Firebase Google 관리자 로그인 버전

관리자 Google 계정:
- sirgom777@gmail.com

필수 Firebase 설정:
1. Firebase 콘솔 → 보안 → Authentication → 로그인 방법
2. Google 제공업체를 '사용 설정'
3. Authentication → 설정 → 승인된 도메인
4. ai-ara.github.io 추가

GitHub에는 아래 파일을 교체/업로드:
- index.html
- style.css
- app.js
- arai-logo.png
- arai-mascot.png

이 버전은 Google 로그인으로 '교사 관리 화면 진입'을 인증합니다.

중요:
현재 작품/피드백 데이터는 localStorage 기반입니다.
실제 여러 기기 공동 사용과 관리자 권한을 서버 수준에서 보호하려면
다음 단계에서 Firestore와 Security Rules를 연결해야 합니다.

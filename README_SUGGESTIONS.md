# arAi Play - 웹 건의사항 + 관리자 답변 버전

이번 버전에 추가된 기능
- 하단 `💬 웹 건의하기`
- 하단 `📋 건의 게시판`
- 기능 제안 / 불편한 점 / 오류 신고 / 기타
- 닉네임 선택 입력
- Firestore `suggestions` 컬렉션 공동 저장
- 공개 건의 게시판
- 관리자 답변
- 처리 상태: 접수 / 확인 중 / 답변 완료 / 반영 완료
- 관리자 건의 삭제
- 최신 ARAI PLAY 로고
- 마스코트 favicon
- 브라우저 탭 제목 `arAi Play`

## 반드시 할 일
1. Firebase → Firestore Database → 규칙
2. `firestore.rules.txt`의 전체 내용을 복사
3. 기존 규칙을 전체 교체
4. 게시

GitHub에 업로드/교체
- index.html
- style.css
- app.js
- arai-logo.png
- arai-mascot.png
- favicon.png

`firestore.rules.txt`는 GitHub에 올릴 필요는 없고 Firebase 규칙 화면에 사용하면 됩니다.

### TODO. 메인페이지

- 메모에 의존 x
- 연결하면 할 수록 더 많이 기억할 수 있다.
- 손쉽게 등록가능하다. (사진도 가능)
- 뇌는 변한다
- 급작스러운 상황에 대비
- 망각곡선에 따름
- 카테고리 별로 볼 수 있다.
- 3개 연결별: 다른 뉴런과 연결
- 동영상: 파인만의 설명법 - 가장 기초적은 걸로 설명해보기
- 반박
  - 그래서 이게 왜 필요한데?
  - 도움의 되긴하는거야?
  - 무슨원리인데 (망각곡선)
  - 너무 복잡한거 아니야? (심플 단어장 원리)
  - 실제 적용 사례좀 줘
  - 그냥 메모 어플이랑 무슨 차이가 있어?
- 카피. 모든것을 질문으로 만들어보세요
- 카피. 똑똑한 뇌 만들기
- 카피. 아 그거 뭐였더라...?
- 카피. 아 저친구 이름이 뭐였더라...?

### 구글시트 세팅

- https://thenewstack.io/how-to-use-google-sheets-as-a-database-with-react-and-ssr/
- https://theoephraim.github.io/node-google-spreadsheet/#/classes/google-spreadsheet-worksheet

- NextAuth
  - https://console.cloud.google.com/apis/credentials/oauthclient/64025593728-a5qq75h3n8rh5crf5roc3qfi2hifqkfa.apps.googleusercontent.com?project=helper-brain

### API

- GetNeuronList
- GetNeuron
- InsertNeuron
- UpdateNeuron
- DeleteNeuron
- UpdateNeuronSynapseUp
- UpdateNeuronSynapseDown

### URL

- /neurons
- /neuron/1
- /neuron-card
- /neuron-structual

### Image: cloudflare

- 네이버 계정
- blob: 붙은건 브라우저 메모리에 있는 데이터를 가지고 오는 것임 -> 그냥 접속시에는 not found
- Direct creator Upload
  - 보통은 서버api에 이미지 보내고 서버에서 cloudflare에 올리지만 서버에 이미지 보낼때 Bandwidth 대역폭 지불해야함 (무거운 이미지라면 더 안좋음)
  - 서버에서 먼저 cloudflare에 요청하여 업로드 가능한 url을 받고 브라우저에서 바로 cloudflare로 이미지 전송한다.
  - 서버 과부하 x
  - 브라우저에서 직접 올리는데 api키가 노출되지 않는다
  - 미리 공간 만들어놓고, 30분동안 업로드 되지 않으면 공간 닫힘
  - 직접 cloudflare에 업로드 하므로 빠르다
  - variant: 원하는 사이즈로 이미지 만들어 놓을 수 있음

### TODO

- 시냅스 3개 연결
  - (1/3)
  - 3의 법칙 적용 (연관지어서 외울 것 3가지)
- 반대로 역 질문도 올리기
- 오늘 등록한 문제 수
- 토탈 문제수는 빼고, 맞춘문제, 틀린문제, 오늘 추가 횟수
- 이걸 아주 쉽게 설명한다면?
  - 초등학생
  - 초보 프로그래머한테 설명하듯

### DB

pscale connect helper-brain

### 참고

프로젝트. Api. get-products
프로젝트. Api. get-products-count
프로젝트. Api. get-product
프로젝트. Api. update-product
프로젝트. Api. create-product
프로젝트. 세션. NextAuth
프로젝트. 세션. 쿠키. 브라우저에 저장가능
프로젝트. 세션. 쿠키. 모든 api 요청에 담김
프로젝트. 세션. 쿠키. 유효기간 설정 가능
프로젝트. 세션. 테이블이 db에 만들어져 있다.
프로젝트. 세션. 고객이 로그인해있으면 db에 저장 -> 로그아웃하면 db에서 삭제
프로젝트. 라이브러리. Lucide 아이콘 관련
프로젝트. 폴더구조. Padding-container  
프로젝트. Configs -> siteConfig (siteName, description)
프로젝트. 플래닛스케일. 1억번 읽기, 1천만번 쓰기, 3 브랜치, 동시접속 1000명
프로젝트. 플래닛스케일. 오토스케일링에 최적화 (결제 필요)
프로젝트. 플래닛스케일. Vitess 데이터 쪼개서 여러 서버에 분산시키는데 초점
프로젝트. 플래닛스케일. 단점. Foreign Key 제약이 없다 -> Prisma 도움 받아야 함
프로젝트. Edit -> Replace in file
프로젝트 withhandler 미들웨어
[libs > server]
Export default async function(req: NextapiRequest, res: NestApiResponse) {
if(req.method !== “POST”){
return status(405).end();
}

    try {
    	await handler(req,res)
    }catch(error){
    	console.log(error)
    	return res.status(500).json({ error })
    }

}

Export default withHandler(“POST”, handler);

export interface SiteConfig {
siteName: string;
description: string;
currentlyAt: string;
socialLinks: {
twitter: string;
youtube: string;
github: string;
linkedin: string;
instagram: string;
};
}

const siteConfig: SiteConfig = {
siteName: "Explorer",
description:
"A minimal and lovely travel blog which shares experiences and citiest around the world!",
currentlyAt: "Budapest",
socialLinks: {
twitter: "https://twitter.com/makrdev",
youtube: "https://youtube.com/@makrdev",
github: "https://github.com/batuhanbilginn",
linkedin: "https://linkedin.com/in/batuhanbilgin",
instagram: "https://instagram.com/batuhanbilginn",
},
};

export default siteConfig;

### 관계 데이터 입력

await prisma.post.create({
data: {
title: 'Types of relations',
tags: { create: [{ name: 'dev' }, { name: 'prisma' }] },
},
})

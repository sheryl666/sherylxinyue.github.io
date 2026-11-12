/*
 * 岗位内容文件：AI 产品经理（ai-pm）· v2 期刊版
 * ------------------------------------------------------------
 * 只改这个文件就能更新网页文字。
 * - 每一「期」(issue) 有 zh / en 两套文字，结构一致。
 * - cover.type: "image" 整幅照片（加 titled: true 会在图上叠小标题和短标题）；"plate" 纯色底+嵌入截图；"type" 纯色+文字（AI 图到位前的占位）。
 *   卡片：image 放图；stat 放关键数字；blank: true 留空色块（等图片）；points 每条详情单独一行。
 *   short：封面上用的短标题；卡片的 stat：卡片上方显示的关键数字（没有就显示大字标题）。
 *   换成 AI 图时：把 type 改成 "image"，并填 src。
 * - 带【待补…】/ [TBD…] 的文字会以黄色虚线高亮。
 * - 数据口径见 docs/v2-规划与决策.md：VerseIn 内部数据一律模糊表述。
 */
window.SITE_CONTENT = {
  meta: { role: "ai-pm", version: "v2", updated: "2026-11-05" },

  ui: {
    en: {
      nav: { issues: "Issues", portfolio: "Portfolio", note: "Editor's Note", contact: "Contact", resume: "Résumé" },
      intro: ["The Archives 2019 — 2026", "Xinyue Zhang", "Shanghai"],
      all: "All", close: "Close", read: "Read the issue", noLabel: "No.",
      prev: "Previous issue", next: "Next issue", back: "All issues",
      role: "Role", time: "Timeline", platform: "Platform", inIssue: "In this issue",
      skip: "Click to skip",
      allWorks: "All portfolios", watch: "Watch", tbdWork: "[TBD: work]", orbitHint: "Drag to rotate · Click a work to open", viewOriginal: "View original",
    },
    zh: {
      nav: { issues: "期刊", portfolio: "作品集", note: "编者按", contact: "联系", resume: "简历" },
      intro: ["The Archives 2019 — 2026", "张馨月 Xinyue Zhang", "上海"],
      all: "全部", close: "关闭", read: "阅读本期", noLabel: "No.",
      prev: "上一期", next: "下一期", back: "全部期刊",
      role: "角色", time: "时间", platform: "平台", inIssue: "本期内容",
      skip: "点击跳过",
      allWorks: "全部作品集", watch: "观看", tbdWork: "【待补：作品】", orbitHint: "拖动旋转 · 点击作品查看", viewOriginal: "查看原作",
    },
  },

  issues: [
    /* ---------- No.01 封面故事 ---------- */
    {
      id: "cover-story", no: "01", year: "2026",
      bg: "#E4CFB6", coverColor: "#3B2F2A",
      cover: { type: "image", src: "assets/img/photo.jpg", position: "50% 40%" },
      link: "note.html",
      en: {
        kicker: "Cover Story",
        title: "An AI product manager who knows how to tell the story",
        line: "Class of 2026 · M.A., Shanghai Jiao Tong University",
      },
      zh: {
        kicker: "封面故事",
        title: "一个会讲故事的 AI 产品经理",
        line: "2026 届 · 上海交通大学硕士",
      },
    },

    /* ---------- No.02 VerseIn ---------- */
    {
      id: "versein", no: "02", year: "2026",
      bg: "#C5DFA8", coverColor: "#111111",
      cover: { type: "plate", src: "assets/img/plate-versein-app.jpg" },
      showcase: [
        "assets/img/versein/versein-home-f.webp",
        "assets/img/versein/versein-video-f.webp",
        "assets/img/versein/versein-image-f.webp",
        "assets/img/versein/versein-marketing-f.webp",
        "assets/img/versein/versein-agent-f.webp",
        "assets/img/versein/versein-mcp-f.webp",
        "assets/img/versein/versein-elements-f.webp",
        "assets/img/versein/versein-explore-f.webp",
        "assets/img/versein/versein-templates-f.webp",
        "assets/img/versein/versein-aitools-f.webp", // 2026-11-10 换成 AI Tools 页新截图（原图 versein-tools-2.webp）
      ],
      en: {
        kicker: "Full-time · Zuler",
        title: "VerseIn: Designing the Business Model for an AI Platform",
        short: "VerseIn", // 封面上只印 VerseIn
        cardTitle: "Designing the Business Model for an AI Platform", // 首页封面下方的标题（不重复 VerseIn）；详情页仍用 title
        line: "Zuler · 7 releases in the first 2 months after launch",
        meta: { role: "Product Manager (monetization & core flows)", time: "May — Nov 2026", platform: "iOS / Android / Web" },
        results: [
          { num: "7", label: "Releases in the first 2 months" },
          { num: "26K+", label: "Users" },
          { num: "~8×", label: "Growth in monthly generations, Jul–Oct" },
        ],
        sections: [
          { heading: "Background", body: [
            "VerseIn is an AI image and video generation platform for global users, integrating 10+ models including Seedance, Kling and GPT Image. Costs vary dramatically from model to model, yet users struggle to tell them apart.",
            "When I joined, the product was still being framed out. The core problem I set out to solve: how to turn complex model costs into a business model users grasp at a glance, and are willing to pay for.",
          ] },
          { heading: "Decision 1: Subscriptions + credits",
            note: "Subscriptions bring steady revenue; credits give every model a single, simple price", // 标题下方的灰色斜体注释
            bullets: [
              "Priced each generation by model cost, and tiered templates by effect (60–100 credits standard, 150–300 for standout effects)",
              "Designed the task status and billing flow: no charge on failure, refund rules shown up front",
              "Unified credit expiry and monthly credit drops for annual plans to reduce confusion",
            ],
            devices: { laptop: "assets/img/versein/versein-pricing-f.webp", phones: ["assets/img/versein/versein-pay-pro-m.webp", "assets/img/versein/versein-pay-coins-m.webp"] }, // 电脑端订阅页 + 手机端会员页 / 金币页，套设备边框排一行
            caption: "Subscription pages on web and mobile: each plan comes with its own credits and model access; credit packs can be bought separately" },
          { heading: "Decision 2: Tiered access that drives upgrades", bullets: [
            "Premium video models only on Ultra / Max plans, giving users a clear reason to upgrade",
            "A first-week offer ($5.99, then $12.99/week), plus win-back and renewal reminders",
            "Coupons, redeem codes, first-purchase bonuses and channel tracking",
          ],
            devices: { items: [ // 关键决策二相关页面：3 张手机端 + 1 张电脑端，cap 是每台下方的小字标注
              { type: "phone", src: "assets/img/versein/versein-upsell-m.webp", cap: "Upgrade prompt when credits run out" },
              { type: "phone", src: "assets/img/versein/versein-firstweek-m.webp", cap: "First-week discount for new users" },
              { type: "phone", src: "assets/img/versein/versein-morelike-m.webp", cap: "\"More like this\" on the creation page" },
              { type: "laptop", src: "assets/img/versein/versein-invite-f.webp", w: 440, cap: "Rewards for inviting new users" },
            ] } },
          { heading: "Decision 3: Let experiments and data decide", bullets: [
            "Led two A/B tests on the paywall and default home tab to validate monetization and generation conversion",
            "Set up GA4 tracking for the creation flow; fixed identity stitching and mismatched generation records",
            "Investigated funnel anomalies and pushed to separate production and test environments for recommendations",
          ],
            image: "assets/img/versein/versein-abtest-f.webp", wide: true, // 示意图（用户自己生成）：分流 → A/B 实验 → 埋点 → 决策；不含真实数据
            caption: "Diagram: validating monetization with A/B tests and creation-funnel tracking" },
          { heading: "What I learned", points: [ // 带序号的三点
            "Good monetization isn't about selling features; it's about making users feel it's worth it.",
            "Pricing, access tiers and growth loops must be designed together, not in silos.",
            "Validate with real data, not gut feeling.",
          ] },
        ],
      },
      zh: {
        kicker: "全职 · Zuler",
        title: "VerseIn：从 0 到 1，给 AI 生成平台设计商业模式",
        short: "VerseIn", // 封面上只印 VerseIn
        cardTitle: "从 0 到 1，给 AI 生成平台设计商业模式", // 首页封面下方的标题（不重复 VerseIn）；详情页仍用 title
        line: "Zuler · 上线后 2 个月迭代 7 个版本",
        meta: { role: "产品经理（商业化与核心链路）", time: "2026.05 — 2026.11", platform: "iOS / Android / Web" },
        results: [
          { num: "7", label: "上线后 2 个月迭代的版本" },
          { num: "2.6w+", label: "用户" },
          { num: "约 8 倍", label: "7–10 月月生成量增长" },
        ],
        sections: [
          { heading: "背景", body: [
            "VerseIn 是一款面向海外用户的 AI 图片与视频生成平台，接入了 Seedance、Kling、GPT Image 等十余个模型。不同模型之间成本相差悬殊，用户却很难看懂其中的差异。",
            "我加入时，产品仍在搭建框架。我要回答的核心问题是：如何把复杂的模型成本，转化为用户一眼看懂、也愿意为之付费的商业模式。",
          ] },
          { heading: "关键决策一：订阅 + 金币双体系",
            note: "订阅带来稳定收入，金币让不同成本的模型可以统一计价", // 标题下方的灰色斜体注释
            bullets: [
              "按模型成本给每次生成定价，模板按效果分档（普通 60–100 金币，效果突出 150–300 金币）",
              "设计生成任务状态与扣费链路，失败不扣费，前置告知退款规则",
              "统一积分有效期和年会员按月发放的口径，减少用户困惑",
            ],
            devices: { laptop: "assets/img/versein/versein-pricing-f.webp", phones: ["assets/img/versein/versein-pay-pro-m.webp", "assets/img/versein/versein-pay-coins-m.webp"] }, // 电脑端订阅页 + 手机端会员页 / 金币页，套设备边框排一行
            caption: "电脑端与手机端的订阅页：不同套餐对应不同的金币额度和模型权限，金币也可单独购买" },
          { heading: "关键决策二：用权益分层引导升级", bullets: [
            "高端视频模型只对 Ultra / Max 套餐开放，让升级有明确理由",
            "新人首周优惠（首周 $5.99，之后 $12.99/周），配合召回和续费提醒",
            "设计优惠券、兑换码、首充奖励和渠道追踪机制",
          ],
            devices: { items: [ // 关键决策二相关页面：3 张手机端 + 1 张电脑端，cap 是每台下方的小字标注
              { type: "phone", src: "assets/img/versein/versein-upsell-m.webp", cap: "权益不够时的引导弹窗" },
              { type: "phone", src: "assets/img/versein/versein-firstweek-m.webp", cap: "新用户首周折扣" },
              { type: "phone", src: "assets/img/versein/versein-morelike-m.webp", cap: "作品页的「更多相似推荐」" },
              { type: "laptop", src: "assets/img/versein/versein-invite-f.webp", w: 440, cap: "邀请新用户的奖励机制" },
            ] } },
          { heading: "关键决策三：用实验和数据说话", bullets: [
            "主导付费墙与首页默认 Tab 两组 A/B 实验，验证商业化与生成转化的方向",
            "搭建 GA4 创作链路埋点，修复身份衔接、生成记录串号等数据问题",
            "排查漏斗倒挂，推动推荐系统生产与测试环境隔离",
          ],
            image: "assets/img/versein/versein-abtest-f.webp", wide: true, // 示意图（用户自己生成）：分流 → A/B 实验 → 埋点 → 决策；不含真实数据
            caption: "示意图：用 A/B 实验和创作链路埋点验证商业化方向" },
          { heading: "我的收获", points: [ // 带序号的三点
            "好的商业化，不是卖功能，是让用户觉得值。",
            "定价、权益、增长机制，要一起设计，不能各管各的。",
            "用真实数据验证，而不是拍脑袋。",
          ] },
        ],
      },
    },

    /* ---------- No.03 Marketing Studio ---------- */
    {
      id: "marketing-studio", no: "03", year: "2026",
      bg: "#CFC2EA", coverColor: "#2A2140",
      cover: { type: "plate", src: "assets/img/plate-marketing.jpg" },
      showcase: [ // 标题下方的功能视频：居中的视频自动静音循环播放
        { type: "video", src: "assets/video/marketing/ms-clone-product.webm", poster: "assets/video/marketing/ms-clone-product-poster.webp", label: "Clone Product Image" },
        { type: "video", src: "assets/video/marketing/ms-clone-ad.webm", poster: "assets/video/marketing/ms-clone-ad-poster.webp", label: "Clone Ad Video" },
        { type: "video", src: "assets/video/marketing/ms-commerce.webm", poster: "assets/video/marketing/ms-commerce-poster.webp", label: "Commerce Studio" },
        { type: "video", src: "assets/video/marketing/ms-marketing.webm", poster: "assets/video/marketing/ms-marketing-poster.webp", label: "Marketing Video" },
        { type: "video", src: "assets/video/marketing/ms-url-video.webm", poster: "assets/video/marketing/ms-url-video-poster.webp", label: "URL to Video" },
      ],
      en: {
        kicker: "Full-time · Zuler",
        title: "Marketing Studio: One-Click Ads for Every Merchant",
        short: "Marketing Studio", // 封面上只印 Marketing Studio
        cardTitle: "One-Click Ads for Every Merchant", // 首页封面下方的标题（不重复 Marketing Studio）；详情页仍用 title
        line: "Third-party share of generations: 49% → 0.7%",
        meta: { role: "Product Manager (roadmap, PRDs, interaction, prompts)", time: "Aug — Nov 2026", platform: "Web / App" },
        results: [
          { num: "5+", label: "AI ad tools shipped" },
          { num: "49%→0.7%", label: "Third-party share of generations" },
          { num: "500+", label: "Templates in the library" },
        ],
        sections: [
          { heading: "Background", body: [
            "Merchants need a steady stream of ad creatives every day, but they can't write prompts and don't have time to learn. So the question became: how do you package AI video into a tool merchants can use right away?",
            "Higgsfield, ImagineArt, PixVerse and Pollo were already in this space. I started by breaking down the competition and mapping the scenarios merchants use most: cloning winning ads, making product images, turning a product link into a video, and creating listing images. Then I looked at how each competitor built them, took stock of what our platform could already do, and, together with our user profile, worked backward to the core direction we should actually pursue.",
            "Once the direction was set, it had to land on a roadmap: what each phase should achieve, and how long it would take to get this area right. Then we built it, one piece at a time.",
          ] },
          { heading: "Decision 1: Turn input into components",
            body: ["Merchants can't write prompts, but they know what they want. So I broke an ad into five components (Mode, Product, Character, Hook, Setting) that users simply pick and combine."],
            stack: [ // 只放组件区域的局部特写：选择前 / 选择后
              { src: "assets/img/marketing/ms-comp-empty.webp", cap: "Before: five components waiting to be picked" },
              { src: "assets/img/marketing/ms-comp-filled.webp", cap: "After: each component shows a thumbnail of what was picked" },
            ] },
          { heading: "Decision 2: One scenario, one tool",
            bullets: [
              "Clone Ad Video: upload a reference ad and your product to recreate its shots and pacing",
              "Clone Product Image: recreate the look of a reference product image",
              "URL to Video: paste a product link and get a video",
              "Listing Images: custom layouts for Amazon, Walmart, TikTok Shop and Shopify, so merchants get a complete set of product listing images in one click",
            ],
            toolTabs: [ // 左侧五个工具按钮，点击后在右侧切换对应的现有网页截图
              { label: "Clone Ad Video", icon: "video", src: "assets/img/marketing/ms-clone-ad-f.webp?v=white", cap: "Clone Ad Video: remake a winning ad with your own product" },
              { label: "Clone Product Image", icon: "image", src: "assets/img/marketing/ms-clone-product-f.webp?v=white", cap: "Clone Product Image: turn a winning product image into yours" },
              { label: "Listing Images", icon: "grid", src: "assets/img/marketing/ms-listing-f.webp?v=white", cap: "Listing Images: pick Amazon, Walmart, TikTok Shop or Shopify and get a full image set in one click" },
              { label: "URL to Video", icon: "link", src: "assets/img/marketing/ms-url-video-f.webp?v=white", cap: "URL to Video: turn a product link into a video" },
              { label: "Commerce Studio", icon: "bag", src: "assets/img/marketing/ms-commerce-f.webp?v=white", cap: "Commerce Studio: turn any product into ad images and videos" },
            ] },
          { heading: "Decision 3: Template quality and in-house supply",
            body: ["Templates are the platform's core supply. Most are built in-house, and their quality directly drives paid conversion. Aiming for quality we can control and supply we own, I drove two workstreams:"],
            bullets: [
              "A template quality loop: set unified acceptance standards and a decision workflow, iterating through batch testing → diagnosis → model reassignment → prompt tuning → retesting; helped build a 500+ template library at about 20 new templates a week, and documented categorization and admin configuration SOPs",
              "Less third-party dependence: after finding the generation pipeline relied heavily on a third-party platform, moved traffic to in-house model templates and set up a multi-model decision mechanism, cutting the third-party share of generations from 49% to 0.7%",
            ],
            pair: [ // 两张示意图并排：模板质量闭环 / 降低第三方依赖
              { src: "assets/img/marketing/ms-loop.webp", cap: "The template quality loop: batch test → find issues → reassign model → tune prompt → re-test" },
              { src: "assets/img/marketing/ms-thirdparty.webp", cap: "Less third-party dependence: traffic moved to in-house templates with multi-model routing" },
            ] },
          { heading: "What I learned", points: [ // 带序号的三点，k 是加粗的关键词
            { k: "Keep it simple", t: "The barrier for AI tools isn't the model, it's whether users know how to use it. Keep the complexity in the product and the prompts, and keep it simple for users." },
            { k: "Go deep, deliver simply", t: "Break down competitors, take stock of what we already have, understand our users and think the direction through, then package complex capabilities into tools merchants can use right away." },
            { k: "Plan, then act", t: "Set the direction and the roadmap: what each phase should achieve and how long it takes to get it right, all thought through up front." },
          ] },
        ],
      },
      zh: {
        kicker: "全职 · Zuler",
        title: "Marketing Studio：让每个商家都能一键做广告",
        short: "Marketing Studio", // 封面上只印 Marketing Studio
        cardTitle: "让每个商家都能一键做广告", // 首页封面下方的标题（不重复 Marketing Studio）；详情页仍用 title
        line: "第三方平台生成占比 49% → 0.7%",
        meta: { role: "产品经理（Roadmap、PRD、交互、Prompt）", time: "2026.08 — 2026.11", platform: "Web / App" },
        results: [
          { num: "5+", label: "上线的 AI 广告工具" },
          { num: "49%→0.7%", label: "第三方平台生成占比" },
          { num: "500+", label: "参与建设的模板库" },
        ],
        sections: [
          { heading: "背景", body: [
            "商家每天都需要大量广告素材，却不会写 Prompt，也没时间学。于是问题变成了：如何把 AI 视频能力，包装成商家拿来就能用的工具？",
            "这个赛道上，Higgsfield、ImagineArt、PixVerse、Pollo 都已入局。我先拆解竞品，梳理出商家最常用的几类场景——复刻爆款广告、制作商品图、用商品链接直接出视频、生成电商详情图。拆完竞品，我进一步看它们各自的实现手段，同时盘点我们平台已有的能力，再结合平台画像，倒推出我们真正该做的核心方向。",
            "方向定下后，还要落到 Roadmap 上：哪个阶段达到什么目标、用多长时间把这块打磨完善。最后，逐个实现。",
          ] },
          { heading: "关键决策一：把输入拆成组件",
            body: ["商家不会写 Prompt，但知道自己要什么。所以我把广告拆成 Mode、Product、Character、Hook、Setting 五个组件，用户点选就能组合出一条广告。"],
            stack: [ // 只放组件区域的局部特写：选择前 / 选择后
              { src: "assets/img/marketing/ms-comp-empty.webp", cap: "选择前：五个组件等待点选" },
              { src: "assets/img/marketing/ms-comp-filled.webp", cap: "选择后：每个组件显示所选内容的缩略图，组合成一条广告" },
            ] },
          { heading: "关键决策二：一个场景，一个工具",
            bullets: [
              "Clone Ad Video：上传参考广告和自己的商品，复刻镜头和节奏",
              "Clone Product Image：复刻参考商品图的视觉效果",
              "URL to Video：贴一个商品链接，直接出视频",
              "Listing Images：针对 Amazon、Walmart、TikTok Shop、Shopify 定制化不同版式，商家一键即可获得整套产品详情图",
            ],
            toolTabs: [ // 左侧五个工具按钮，点击后在右侧切换对应的现有网页截图
              { label: "Clone Ad Video", icon: "video", src: "assets/img/marketing/ms-clone-ad-f.webp?v=white", cap: "Clone Ad Video：用自己的商品复刻爆款广告" },
              { label: "Clone Product Image", icon: "image", src: "assets/img/marketing/ms-clone-product-f.webp?v=white", cap: "Clone Product Image：复刻爆款商品图的视觉效果" },
              { label: "Listing Images", icon: "grid", src: "assets/img/marketing/ms-listing-f.webp?v=white", cap: "Listing Images：选择 Amazon / Walmart / TikTok Shop / Shopify 版式，一键出整套详情图" },
              { label: "URL to Video", icon: "link", src: "assets/img/marketing/ms-url-video-f.webp?v=white", cap: "URL to Video：商品链接直接出视频" },
              { label: "Commerce Studio", icon: "bag", src: "assets/img/marketing/ms-commerce-f.webp?v=white", cap: "Commerce Studio：把商品做成广告图和视频" },
            ] },
          { heading: "关键决策三：模板提质与自研替代",
            body: ["模板是平台的核心供给，绝大部分由团队自建，其质量直接影响付费转化。围绕「质量可控」与「供给自主」两个目标，我主要推进了两项工作："],
            bullets: [
              "建立模板质量闭环：制定统一的验收标准与决策流程，按「批量测试 → 问题定位 → 模型重配 → Prompt 调优 → 复验」持续迭代；参与建设 500+ 模板库，以每周约 20 个的节奏补充，并沉淀模板分类与后台配置 SOP",
              "降低第三方依赖：识别出生成链路对第三方平台依赖较高后，推动生成流量迁移至自研模型模板，并建立多模型决策机制，第三方平台生成占比由 49% 降至 0.7%",
            ],
            pair: [ // 两张示意图并排：模板质量闭环 / 降低第三方依赖
              { src: "assets/img/marketing/ms-loop.webp", cap: "模板质量闭环：批量测试 → 问题定位 → 模型重配 → Prompt 调优 → 复验" },
              { src: "assets/img/marketing/ms-thirdparty.webp", cap: "降低第三方依赖：生成流量迁移至自研模板，并通过多模型路由分发" },
            ] },
          { heading: "我的收获", points: [ // 带序号的三点，k 是加粗的关键词
            { k: "化繁为简", t: "AI 工具的门槛不在模型，而在用户会不会用。把复杂度留给产品和 Prompt，把简单留给用户。" },
            { k: "深入浅出", t: "先拆竞品、盘家底、看画像，把方向想透，再把复杂能力包装成商家拿来就能用的工具。" },
            { k: "谋定后动", t: "定方向、排 Roadmap，哪个阶段达成什么目标、用多久打磨完善，都想在前面。" },
          ] },
        ],
      },
    },

    /* ---------- No.04 AI 工作流 ---------- */
    {
      id: "ai-workflow", no: "04", year: "2026", numbered: true, accent: "#2F6FA8", // 四个大块标题前加序号 01–04；accent：和浅蓝底同色系、更鲜明的蓝
      bg: "#B9D3E8", coverColor: "#172A3B",
      cover: { type: "image", src: "assets/img/cover-04.jpg", position: "50% 55%", titled: true },
      en: {
        kicker: "Side Project",
        title: "Rebuilding My Own Workflow with AI",
        short: "My New Colleague", // 封面上的标题
        line: "71 SEO articles in 13 days, localized into 7 languages",
        // 四块左右交替：标题大、标题下一行小字解释（note）、2–3 个要点；有截图放截图，没截图先放大字卡片（visual）
        sections: [
          { heading: "AI content pipeline", blog: true,
            note: "71 SEO articles in 13 days, localized into 7 languages",
            bullets: [
              "Chained topic selection, drafting, SEO optimization and translation into one AI pipeline",
              "One topic in, publish-ready articles out, efficiently and in batches",
              "Brought content output from days per article down to a steady daily rhythm",
            ] },
          { heading: "Video prompt workbench", side: true, image: "assets/img/ws-prompt.webp", flat: true, // 用户生成的示意图
            note: "Speeding up template and video prompt production",
            bullets: [
              "Keeps template and video prompts in one place, easy to reuse and compare",
              "Tests prompt variations side by side to get templates live faster",
            ] },
          { heading: "6 reusable Skills", side: true, image: "assets/img/ws-skills.webp", flat: true, // 用户生成的示意图
            note: "Turning the standards and methods I use again and again into reusable skills",
            bullets: [
              "PRD standard: drafts PRDs in one consistent structure",
              "UI standard: keeps interaction and visuals consistent across tool pages",
              "Prompt reverse-engineering: works back from a reference image or video to a reusable prompt",
            ] },
          { heading: "Automated daily reports", side: true, image: "assets/img/ws-daily.webp", flat: true, // 用户生成的示意图
            note: "Every workday at 18:30, team updates are summarized automatically",
            bullets: [
              "Pulls the day's progress from team chats and Confluence",
              "Organizes it by project into a daily report, building a more systematic personal knowledge base",
            ] },
        ],
      },
      zh: {
        kicker: "个人项目",
        title: "用 AI 重构自己的工作流",
        short: "My New Colleague", // 封面上的标题（中英文都用英文）
        line: "13 天发布 71 篇 SEO 文章，完成 7 种语言本地化",
        // 四块左右交替：标题大、标题下一行小字解释（note）、2–3 个要点；有截图放截图，没截图先放大字卡片（visual）
        sections: [
          { heading: "AI 内容流水线", blog: true, // blog：文字下方放博客发布墙（发布日历 + 滚动文章卡片，数据在 content/blog-posts.js）
            note: "13 天发布 71 篇 SEO 文章，完成 7 种语言本地化",
            bullets: [
              "把选题、撰写、SEO 优化和翻译串成一条 AI 流水线",
              "输入一个主题，高效批量产出可直接发布的文章",
              "内容产出从按天计，变成稳定的日更节奏",
            ] },
          { heading: "视频 Prompt 工作台", side: true, image: "assets/img/ws-prompt.webp", flat: true, // 用户生成的示意图
            note: "提升模板和视频 Prompt 的生产效率",
            bullets: [
              "集中管理模板和视频的 Prompt，方便复用和对比",
              "并排测试不同 Prompt 的效果，加快模板上线",
            ] },
          { heading: "6 个可复用 Skills", side: true, image: "assets/img/ws-skills.webp", flat: true, // 用户生成的示意图
            note: "把反复用到的规范和方法，沉淀成可以随时调用的技能",
            bullets: [
              "PRD 规范：按统一结构生成 PRD 初稿",
              "UI 规范：保证各工具页的交互和视觉一致",
              "Prompt 反推：从参考图或视频反推出可复用的生成 Prompt",
            ] },
          { heading: "日报自动化", side: true, image: "assets/img/ws-daily.webp", flat: true, // 用户生成的示意图
            note: "每个工作日 18:30，自动汇总当天的工作要点",
            bullets: [
              "自动抓取群聊和 Confluence 里的当天进展",
              "按项目整理成日报，个人知识库系统化",
            ] },
        ],
      },
    },

    /* ---------- No.05 蔚来 ---------- */
    {
      id: "nio", no: "05", year: "2025", numbered: true, accent: "#3F6A92", // 三块左右交替加序号 01–03；accent：和灰蓝底同色系、更鲜明的蓝
      bg: "#C3CFDC", coverColor: "#2E3A46",
      cover: { type: "image", src: "assets/img/cover-05.jpg", titled: true },
      en: {
        kicker: "Internship · NIO",
        title: "NIO: Making the Task Center Customizable",
        short: "NIO", // 封面上只印 NIO
        line: "Filter setup time: 2 days → half a day",
        meta: { role: "App Marketing Product Intern", time: "Jul — Nov 2025", platform: "Mate App Task Center (Web / App)" },
        results: [
          { num: "2d → ½d", label: "Filter setup time" },
          { num: "Self-serve", label: "Ops maintain task types without engineers" },
          { num: "0 → 1", label: "Task type templates" },
        ],
        // 背景 + 三块左右交替（标题、小字说明、要点、用户生成的示意图）+ 我的收获（带序号）
        sections: [
          { heading: "Background", body: [
            "NIO's marketing platform product team focuses on existing-owner operations. I worked on the Task Center in the Mate App, which helps sales advisors (Fellows) follow up with owner leads. Digitizing and making the task flow configurable raises lead follow-up and task completion rates, and indirectly drives conversion.",
            "The problem: filter dimensions were fixed, and any change to a task type needed an engineer, so even small adjustments had to wait for a dev slot.",
          ] },
          { heading: "Custom quick filters", side: true, image: "assets/img/nio-filters.webp", flat: true,
            note: "Filters were fixed and inflexible; every change needed an engineering slot",
            bullets: [
              "Designed the prototype and PRD for configurable quick filters",
              "Supported two- and three-level filters, synced across web and app",
              "Cut filter setup time from 2 days to half a day",
            ] },
          { heading: "Self-serve task types", side: true, image: "assets/img/nio-tasktypes.webp", flat: true,
            note: "Changing a task type needed engineers, adding cross-team overhead",
            bullets: [
              "Designed create / edit / view for task types, planning fields, levels and permissions",
              "Wrote the PRD and led the feature review through to launch",
              "After launch, ops could maintain task types on their own",
            ] },
          { heading: "Task type templates", side: true, image: "assets/img/nio-templates.webp", flat: true,
            note: "Turning task type management into reusable templates, from 0 to 1",
            bullets: [
              "Built reusable templates to support different business lines",
              "Abstracted filters and create / edit / delete into reusable components",
              "Laid the structural groundwork for a unified Task Center",
            ] },
          { heading: "What I learned", points: [
            { k: "Subtract, don't add", t: "Work out what can be left out first, instead of piling on features." },
            { k: "Reuse components", t: "Abstract filters and create / edit / delete into reusable components: design once, use everywhere." },
            { k: "Start from the user's problem", t: "Begin with what sales advisors and ops actually struggle with, not with the technical logic." },
          ] },
        ],
      },
      zh: {
        kicker: "实习 · 蔚来",
        title: "蔚来：让任务中心实现自定义",
        short: "NIO", // 封面上只印 NIO（中英文都用英文）
        line: "筛选配置周期 2 天 → 半天",
        meta: { role: "APP 营销产品实习生", time: "2025.07 — 2025.11", platform: "Mate App 任务中心（Web / App）" },
        results: [
          { num: "2 天 → 半天", label: "筛选配置周期" },
          { num: "自助", label: "运营自助维护任务类型" },
          { num: "0 → 1", label: "任务类型模板化" },
        ],
        // 背景 + 三块左右交替（标题、小字说明、要点、用户生成的示意图）+ 我的收获（带序号）
        sections: [
          { heading: "背景", body: [
            "蔚来营销平台产品团队聚焦存量用户运营。我负责 Mate App 任务中心——它帮助销售顾问（Fellow）跟进存量车主线索，通过任务流程数字化与可配置化，提升线索跟进率和任务完成率，间接推动成交转化。",
            "问题在于：任务筛选维度固定，任务类型的任何改动都要技术介入，哪怕是很小的调整也要排期。",
          ] },
          { heading: "任务快筛自定义配置", side: true, image: "assets/img/nio-filters.webp", flat: true,
            note: "筛选维度固定、配置不灵活，每次调整都要技术排期",
            bullets: [
              "设计「任务快筛自定义配置」原型与 PRD",
              "支持二 / 三级分类筛选，Web 和 App 双端同步",
              "配置周期从 2 天缩短到半天",
            ] },
          { heading: "任务类型增改查", side: true, image: "assets/img/nio-tasktypes.webp", flat: true,
            note: "任务类型要技术介入才能修改，跨部门沟通成本高",
            bullets: [
              "设计任务类型增改查模块，规划字段、层级和权限逻辑",
              "完成 PRD 与功能评审，推动上线",
              "上线后运营可自助维护任务类型，不再依赖技术",
            ] },
          { heading: "任务模板化", side: true, image: "assets/img/nio-templates.webp", flat: true,
            note: "从 0 到 1，把任务类型管理做成可复用的模板",
            bullets: [
              "构建可复用模板，支撑不同业务线",
              "把筛选、增删改查抽象为可复用组件",
              "为任务中心统一化打下结构基础",
            ] },
          { heading: "我的收获", points: [
            { k: "做减法", t: "先想清楚哪些可以不做，而不是一味往上加功能。" },
            { k: "组件化复用", t: "把筛选、增删改查抽象成可复用组件，一次设计，多处使用。" },
            { k: "从用户问题出发", t: "从销售顾问和运营的真实问题出发，而不是被技术逻辑带着跑。" },
          ] },
        ],
      },
    },

    /* ---------- No.06 VidFit ---------- */
    {
      id: "vidfit", no: "06", year: "2024", numbered: true, accent: "#B4533D", // 四块左右交替加序号；accent：和蜜桃底同色系、更鲜明的砖红
      bg: "#F2C4B6", coverColor: "#5A2A22",
      cover: { type: "image", src: "assets/img/cover-06-saas.jpg", titled: true },
      showcase: [ // 标题下改为产品 Demo，进入页面后自动静音循环播放
        { type: "video", src: "assets/img/vidfit/vf-demo.mp4", poster: "assets/img/vidfit/vf-demo-poster.jpg", label: "VidFit product demo", expand: true },
      ],
      en: {
        kicker: "Innovation · SJTU Lab",
        title: "VidFit.ai: An Innovative AI-Driven Solution",
        short: "VidFit.ai",
        cardTitle: "An Innovative AI-Driven Solution", // 首页封面下方的标题（不重复 VidFit.ai）；详情页仍用 title
        line: "4 AI startup awards, including first prize at CICAS",
        meta: { role: "Team Lead (product & project)", time: "2024", platform: "Web (SaaS)" },
        sections: [
          { heading: "Background", body: [
            "E-commerce is going video-first: shoppers increasingly learn about products through short videos and livestreams, and product pages are moving from images to video.",
            "For small sellers, though, a 15–30 second product video means booking models, photographers, a venue and post-production. It usually costs 1,000–3,000 RMB and takes 1–2 days, with uncertain results.",
            "VidFit.ai is an AI-driven product-page video solution for fashion e-commerce, built for small sellers in Southeast Asia. Built on generative video models and virtual try-on technology from SJTU's Intelligent Media & Creativity Lab, it turns a single clothing image into a video of a model wearing it.",
          ] },
          { heading: "Finding the need", side: true, image: "assets/img/vidfit/vf2-value.webp", flat: true,
            note: "Interviewed 20+ sellers; the core need was low-cost, high-quality video",
            bullets: [
              "Mapped the traditional product-video workflow: models, shoots and editing meant high cost, long lead times and uncertainty",
              "Broke down two kinds of competitors: try-on features seen as gimmicks, and image-to-video tools with unnatural blending and no fashion e-commerce use cases",
              "Positioned the product as a seller tool that quickly generates product-page videos",
            ] },
          { heading: "Designing the product", side: true, carousel: [ // 原顶部官网截图轮播，换到本段左侧
              "assets/img/vidfit/vf2-home-f.webp",
              "assets/img/vidfit/vf2-login-f.webp",
              "assets/img/vidfit/vf2-step1-f.webp",
              "assets/img/vidfit/vf2-step2-f.webp",
              "assets/img/vidfit/vf2-step3-f.webp",
              "assets/img/vidfit/vf2-case1-f.webp",
              "assets/img/vidfit/vf2-case2-f.webp",
            ],
            note: "Upload a garment → pick a model → pick a pose → generate → export",
            bullets: [
              "Combined the VidFit Diffusion architecture with SimSwap identity editing, supporting custom models, garments and poses",
              "Designed a three-step flow that needs no shooting or editing skills",
              "Got the front-end landing page live, closing the loop on automated video generation for sellers",
            ] },
          { heading: "Business model", side: true, image: "assets/img/vidfit/vf2-pricing.webp", flat: true,
            note: "A two-tier SaaS subscription: the basic plan drives sign-ups, the premium plan earns from add-ons",
            bullets: [
              "Basic + Senior plans",
              "Plan to start with small sellers in Southeast Asia, then expand to independent stores overseas",
            ] },
          { heading: "Competitions", side: true, image: "assets/img/vidfit/vf-awards.webp", flat: true, tall: true, // 4 张获奖证书 + 文心杯奖杯，拼成两行、透明底
            note: "Four awards at national and city-level AI startup competitions in 2024",
            bullets: [
              "First prize, 2nd National AI Application Scenario Innovation Challenge (CICAS)",
              "Second prize, Shanghai Female College Students' Innovation & Entrepreneurship Competition; second prize, 2nd Baidu Wenxin Cup AI Startup Competition",
              "Third prize, CCF Tech Startup Competition",
            ] },
          { heading: "What I learned", points: [
            { k: "Usability first", t: "When output was unstable and not yet commercial-grade, a reliable, usable product mattered more than chasing 100% automation." },
            { k: "From tool to conversion", t: "Sellers don't want videos for their own sake, they want sales. The product has to evolve from a seller tool into a conversion tool." },
            { k: "Beyond the technology", t: "Funding and how the team's resources are allocated decide how far a project can go, just as much as the tech." },
          ] },
        ],
      },
      zh: {
        kicker: "创业创新 · 上海交大",
        title: "VidFit.ai：创新 AI 驱动解决方案",
        short: "VidFit.ai",
        cardTitle: "创新 AI 驱动解决方案", // 首页封面下方的标题（不重复 VidFit.ai）；详情页仍用 title
        line: "4 项 AI 创业大赛奖，含 CICAS 一等奖",
        meta: { role: "团队负责人（产品与项目统筹）", time: "2024", platform: "Web（SaaS）" },
        // 背景 + 四块左右交替（标题、小字说明、要点、PPT 里的产品截图）+ 我的收获（带序号）
        sections: [
          { heading: "背景", body: [
            "电商正在经历「视频化」：消费者越来越习惯通过短视频和直播了解商品，商品详情页也在从图文转向视频。",
            "但对中小商家来说，拍一条 15–30 秒的商详视频，要对接模特、摄影师、场地和后期，费用通常在 1000–3000 元，工期 1–2 天，效果还不确定。",
            "VidFit.ai 是面向东南亚中小电商商家的 AI 驱动的服装电商行业商详视频生成方案：基于上海交大智能媒体与创意实验室的生成式视频大模型和虚拟试衣技术，把一张服装图自动变成模特上身的展示视频。",
          ] },
          { heading: "找到需求", side: true, image: "assets/img/vidfit/vf2-value.webp", flat: true,
            note: "调研 20+ 电商商家，明确核心需求：低成本 + 高质量视频",
            bullets: [
              "梳理商详视频的传统制作流程：对接模特、拍摄、后期，人力成本高、周期长、不确定性大",
              "拆解两类竞品：虚拟试衣被当作营销噱头；图生视频人物与背景融合不自然，也没有服装电商的落地案例",
              "确定产品定位：给商家用的工具，快速生成商品详情页视频",
            ] },
          { heading: "设计产品", side: true, carousel: [ // 原顶部官网截图轮播，换到本段左侧
              "assets/img/vidfit/vf2-home-f.webp",
              "assets/img/vidfit/vf2-login-f.webp",
              "assets/img/vidfit/vf2-step1-f.webp",
              "assets/img/vidfit/vf2-step2-f.webp",
              "assets/img/vidfit/vf2-step3-f.webp",
              "assets/img/vidfit/vf2-case1-f.webp",
              "assets/img/vidfit/vf2-case2-f.webp",
            ],
            note: "上传服装 → 选择模特 → 选择动作 → 生成视频 → 导出",
            bullets: [
              "结合 VidFit Diffusion 架构与 SimSwap 形象编辑技术，支持自定义模特、服装和动作",
              "设计三步生成流程，商家不需要任何拍摄和剪辑经验",
              "推动前端落地页上线，实现商家端自动化视频生成闭环",
            ] },
          { heading: "商业模式", side: true, image: "assets/img/vidfit/vf2-pricing.webp", flat: true,
            note: "双层 SaaS 订阅：基础版吸引注册，高级版靠增值功能盈利",
            bullets: [
              "基础版 + 高级版",
              "规划先切入东南亚中小商家，再拓展到海外独立站",
            ] },
          { heading: "参赛与获奖", side: true, image: "assets/img/vidfit/vf-awards.webp", flat: true, tall: true, // 4 张获奖证书 + 文心杯奖杯，拼成两行、透明底
            note: "2024 年获得 4 项全国及市级 AI 创业大赛奖项",
            bullets: [
              "第二届全国人工智能应用场景创新挑战赛（CICAS）一等奖",
              "上海市女大学生创新创业大赛二等奖、百度第二届文心杯 AI 创业大赛二等奖",
              "CCF 科技创业大赛三等奖",
            ] },
          { heading: "我的收获", points: [
            { k: "可用性优先", t: "生成效果不稳定、还没达到商业化标准时，与其追求 100% 自动化，不如先把可用性做扎实。" },
            { k: "从工具走向转化", t: "商家要的不是视频本身，而是成交。产品要从「商家工具」走向「转化工具」。" },
            { k: "技术之外", t: "融资和团队资源配置，和技术一样决定一个项目能走多远。" },
          ] },
        ],
      },
    },

    /* ---------- No.07 美团 · 哈啰（一期两部分，详情页往下滑依次展示） ---------- */
    {
      id: "growth", no: "07", year: "2024", accent: "#A5561C", // 技能树用的强调色：和明黄底同色系的焦糖棕
      bg: "#EFD593", coverColor: "#3D3220",
      cover: { type: "image", src: "assets/img/cover-07.jpg", titled: true },
      en: {
        kicker: "Internships · Meituan & Hellobike",
        title: "Meituan & Hellobike: Learning How Things Get Wanted",
        short: "How Things Get Wanted",
        line: "Daily page views ~120K → ~260K · Banner CTR 1.9% → 3.2%",
        parts: [
          {
            kicker: "Part I · Meituan · Dianping", receipt: "MEITUAN · DIANPING", // receipt：小票抬头
            hideMeta: true, brand: { no: "01", label: "Product Operations", logos: ["assets/img/logos/meituan.png", "assets/img/logos/dianping.png"] },
            title: "Must-Eat List IP Monetization",
            lead: "I was deeply involved in monetizing Dianping's Must-Eat List IP, coordinating campaign planning, IP operations and data support to turn the content momentum of a food ranking into marketing packages brands valued.",
            meta: { role: "Product Operations Intern · Must-Eat List IP", time: "Oct 2024 — Jan 2025", platform: "Dianping" },
            cards: [
              { label: "07.1", btn: "Campaign planning", title: "Planned the sponsorship pitch and brand benefits for China's first nationwide carb festival", stat: "120K → 260K", text: "Planned the sponsorship pitch and brand benefits; brought in 30+ brands and merchants, and daily page views rose from ~120K to ~260K." },
              { label: "07.2", btn: "IP operations", title: "Grew one-off events into city-wide marketing packages, building the Must-Eat List IP family", text: "Helped build Must-Eat Market, City Guide and Carnival, growing from one-off events into city-wide marketing packages." },
              { label: "07.3", btn: "Partnerships", title: "Researched competitors and worked across teams to land 6 cross-industry partnerships", stat: "6", text: "Researched Xiaohongshu, Douyin local services and Trip.com, then worked across teams to land 6 partnerships with music festivals and tourism boards." },
              { label: "07.4", btn: "Data insights", title: "Wrote weekly reports across users, merchants and content to inform sales and strategy", text: "Wrote weekly reports with SQL and Excel across users, merchants and content to help sales answer client needs." },
            ],
          },
          {
            kicker: "Part II · Hellobike", receipt: "HELLOBIKE · TOP-UP",
            hideMeta: true, brand: { no: "02", label: "User Operations", logos: ["assets/img/logos/hellobike.png"] },
            title: "Top-up User Growth",
            lead: "I led user growth for the top-up business line in Hellobike's fintech unit. Driven by data, I ran A/B tests, fine-tuned ad placements and content operations to keep finding and shipping growth strategies that lifted conversion.",
            meta: { role: "User Operations Intern · Top-up Growth", time: "Jun 2024 — Sep 2024", platform: "Hellobike App / Mini Program" },
            cards: [
              { label: "07.5", btn: "Creative quality", title: "Polish banner visuals and creative to lift front-end conversion", stat: "1.9% → 3.2%", text: "Redesigned the holiday coupon banner with a countdown and limited-time offer; CTR rose from 1.9% to 3.2%." },
              { label: "07.6", btn: "Cost efficiency", title: "Rework budget allocation to deliver high ROI on a lower budget", stat: "−30%", text: "Managed ad placements and bids for phone top-ups; kept ROI stable with tiered bidding and audience targeting after a 30% budget cut." },
              { label: "07.7", btn: "User experience", title: "Set frequency and reach standards to cut over-messaging", text: "Users complained about too many pushes, so I ran A/B tests (10K+ users, two weeks) to tune push and in-app message timing." },
              { label: "07.8", btn: "Data insights", title: "Build a weekly data report system so insights feed back into strategy", text: "Mined top-up data with SQL and wrote weekly analyses to guide strategy." },
            ],
          },
        ],
      },
      zh: {
        kicker: "实习 · 美团 & 哈啰",
        title: "美团与哈啰：学会让一样东西被需要",
        short: "让好东西被需要",
        line: "日均曝光约 12 万 → 26 万 · Banner CTR 1.9% → 3.2%",
        parts: [
          {
            kicker: "第一部分 · 美团 · 大众点评", receipt: "美团 · 大众点评", // receipt：小票抬头；有它时技能点做成按钮 + 小票
            hideMeta: true, brand: { no: "01", label: "产品运营", logos: ["assets/img/logos/meituan.png", "assets/img/logos/dianping.png"] }, // 顶部一行：左「01 产品运营」，右 logo
            title: "必吃榜 IP 商业化",
            lead: "深度参与大众点评必吃榜 IP 商业化项目。统筹营销策划、IP 运营及数据支持，成功将美食榜单的内容势能，转化为品牌方认可的营销方案。",
            meta: { role: "产品运营实习生 · 必吃榜 IP 商业化", time: "2024.10 — 2025.01", platform: "大众点评" },
            cards: [
              { label: "07.1", btn: "营销策划", title: "独立策划招商方案与品牌权益，打造全国首个超级碳水节", stat: "12万 → 26万", text: "独立策划招商方案和品牌权益玩法，吸引 30+ 品牌/商户入驻，页面日均曝光约 12 万 → 26 万。" },
              { label: "07.2", btn: "IP 运营", title: "从单场活动升级为城市营销方案，搭建必吃榜 IP 矩阵", text: "参与打造「必吃榜市集」「必吃城市向导」「必吃嘉年华」，从单场活动升级为城市营销方案。" },
              { label: "07.3", btn: "商务拓展", title: "调研竞品、跨部门协同，推动 6 个异业合作方案落地", stat: "6", text: "主导小红书、抖音生活服务、携程等竞品调研，跨部门推动与音乐节、旅游局等 6 个合作方案落地。" },
              { label: "07.4", btn: "数据洞察", title: "输出用户 / 商户 / 内容三维度周报，为销售与策略提供依据", text: "用 SQL 和 Excel 输出用户侧、商户侧、内容侧三个维度的周报，支持销售对接客户需求。" },
            ],
          },
          {
            kicker: "第二部分 · 哈啰", receipt: "哈啰 · 充值业务",
            hideMeta: true, brand: { no: "02", label: "用户运营", logos: ["assets/img/logos/hellobike.png"] }, // 顶部一行：左「02 用户运营」，右哈啰 logo
            title: "充值业务用户增长",
            lead: "在哈啰数科充值业务线核心负责用户增长。以数据为驱动，通过跑通 A/B 实验、精细化广告投放与内容运营，持续探索并落地充值业务的增长策略，提升业务转化。",
            meta: { role: "用户运营实习生 · 充值业务增长", time: "2024.06 — 2024.09", platform: "哈啰 App / 小程序" },
            cards: [
              { label: "07.5", btn: "素材提质", title: "打磨 Banner 视觉与创意，提升前端转化效率", stat: "1.9% → 3.2%", text: "节假日券包 Banner 用「倒计时 + 限时抢 + 红色视觉」改版，CTR 从 1.9% 提升到 3.2%。" },
              { label: "07.6", btn: "降本增效", title: "重构资源分配机制，实现低预算下的高 ROI 产出", stat: "−30%", text: "负责话费板块 App/小程序广告位配置与出价，预算降低 30% 的情况下，通过分层出价和人群优化保持 ROI 稳定。" },
              { label: "07.7", btn: "体验护航", title: "建立频控 / 触达标准，减少对用户的过度打扰", text: "针对用户投诉推送太频繁，用多轮 A/B 测试（样本 1 万+、周期两周）调整 Push 与站内信节奏。" },
              { label: "07.8", btn: "数据赋能", title: "搭建数据周报体系，以数据洞察反哺策略优化", text: "用 SQL 做充值板块的数据挖掘和周报分析，为策略调整提供依据。" },
            ],
          },
        ],
      },
    },

  ],

  /* ---------- 编者按 Editor's Note ---------- */
  note: {
    en: {
      kicker: "Editor's Note",
      title: "Dear reader,",
      letter: [
        "I spent four undergraduate years in electronic information engineering, sharpening my logic, while quietly planting a curiosity for new media in the gaps between classes. Then I chose to study Digital Culture & Management at Shanghai Jiao Tong University, where business, engineering and communication meet, like three rivers flowing into the same sea. In the lab, I turned AI from a concept into a product for the first time. Project after project, internship after internship, I gradually found the direction I truly wanted to pursue.",
        "In the second year of my master's, I went on exchange to KU Leuven in Belgium. That full and special time abroad opened my eyes even wider. Since then, I've been curious about everything unknown, eager to explore, and keen to listen to voices from every direction.",
        "I'm an internet surfer running at 5G speed, and a job seeker looking for my place in the AI wave.",
        "I'm ready to embrace this wave with open arms, and I've always believed that people and AI together can create endless possibilities.",
        "So I hope to keep an endless supply of creativity, ride the AI wave and sail through it, create value on a great platform, and build meaningful products that truly benefit users.",
      ],
      sign: "— Xinyue Zhang, Shanghai, 2026",
      beliefsTitle: "Things I believe",
      beliefs: [
        { title: "Start from the user's problem", text: "Don't let the tech lead. Know the outcome users want before choosing a model." },
        { title: "Grounded in user value", text: "Not selling features or adding ads, but making users feel it's worth it." },
        { title: "Dare to subtract", text: "If one component can solve it, don't build two features." },
        { title: "Ask down to the root cause", text: "From an upload error to a backend parameter, from a win-back bug to a guest UID. Never stop at the surface." },
      ],
      skillsTitle: "What I work with",
      skills: [
        { name: "Product", items: "PRD writing · Figma prototyping · requirement breakdown · component design · zero to one" },
        { name: "AI & AIGC", items: "Model selection & evaluation · prompt engineering · multi-model strategy · AI workflows · Skills" },
        { name: "Growth & Monetization", items: "Subscriptions & credits · pricing & tiers · A/B testing · GA4 tracking · SQL" },
      ],
      beyondTitle: "Beyond work",
      beyond: [
        { num: "1.8M+", text: "Views on my personal content account, 100+ posts" },
        { num: "400+", text: "People in the community I ran for the photo studio I co-founded" },
        { num: "4", text: "Volunteer teaching and community service programs" },
      ],
      beyondPhotos: [
        { src: "assets/img/beyond-2020-lhasa.jpg", cap: "2020 · Lhasa, Tibet" },
        { src: "assets/img/beyond-2022-tianjin.jpg", cap: "2022 · Tianjin" },
        { src: "assets/img/beyond-2023-guilin.jpg", cap: "2023 · Guilin, Guangxi" },
      ],
      honorsLabel: "Honors",
      campus: [
        {
          title: "In SJTU",
          sub: "Shanghai Jiao Tong University · M.A. Digital Culture & Management · 2023 — 2026",
          photo: "assets/img/sjtu-graduation.jpg", accent: "#C8161D", logo: "assets/img/sjtu-logo.png", // 交大红 + 透明底校徽
          roles: ["Outstanding\nGraduate 2026", "League Branch\nSecretary", "Sports & Arts\nDepartment"], // \n：固定换行，三个头衔都是两行
          details: [
            { label: "Program", text: "The program trains managers and innovative leaders for the digital cultural and creative industries, through an interconnected curriculum across six tracks:",
              tags: ["Curation & Digital Museums", "Film & Digital Media", "Digital Music & Management", "AI & Innovative Design", "Digital Communication & Brand Management", "Intelligent Communication & Intangible Heritage"] },
            { label: "Core courses", tags: ["Digital Cultural & Creative Industry Research", "AI Art Installation", "AI and Cognition", "Media Management", "New Media Studies", "Business Communication", "Corporate Finance"] },
            { label: "On campus", half: true, list: [
              { t: "Cultural tourism in Jizhou", y: "Jul 2024", href: "https://mp.weixin.qq.com/s/hL5Y-aHfNQCJvX3a5ofF8w",
                m: "Field research in Jizhou District, Tianjin: visited local cultural landmarks, interviewed residents and visitors, analyzed pain points in the tourism industry, and combined CG, IP character design and interactive product development into a distinctive IP brand plan for Jizhou." },
            ] },
            { label: "Honors & Scholarships", half: true, dated: true, list: [
              { t: "Outstanding Graduate", m: "2026" },
              { t: "Merit Student", m: "2024 — 2025" },
              { t: "Outstanding League Cadre", m: "2023 — 2024" },
              { t: "Outstanding League Member", m: "2023 — 2024" },
              { t: "Academic Scholarship", m: "2023 — 2025" },
            ] },
          ],
        },
        {
          title: "In TGU",
          sub: "Tiangong University · B.Eng. Electronic Information Engineering · 2019 — 2023",
          accent: "#6A2564", photoSide: "right", photo: "assets/img/tgu-campus.jpg", logo: "assets/img/tgu-logo.png", // 天工大紫（取自校徽）；照片在右，和 In SJTU 左右交替
          roles: ["League Branch\nSecretary", "Head of News,\nNew Media Center", "Outstanding\nStudent Journalist"],
          details: [
            { label: "Student work", list: [
              { t: "League Branch Secretary, Class EE 1906", y: "Sep 2019 — Jun 2023",
                m: "Led our branch to third prize in TGU's 2019 League Branch Showcase and to TGU Outstanding Class in 2022." },
              { t: "Head of News, New Media Center", y: "Sep 2019 — Sep 2022",
                m: "Handled copywriting, event planning, video editing and photography: planned 80+ posts, edited nearly 100 more, shot 30+ campus events, and contributed to 1,000+ posts and 40+ videos." },
              { t: "Student Supervisor, 2nd Integrity Research Society", y: "Sep 2021 — Sep 2022",
                m: "Helped review canteen prices and service with the university's inspection team, collecting 2,800+ student opinions; co-planned the 2021 campus integrity exhibition." },
            ] },
            { label: "New media results", aside: true, stats: [
              { n: "4,000+", l: "Reads on our top post" },
              { n: "1,000+", l: "New followers during my term" },
              { n: "23,000+", l: "Shares across channels" },
            ] },
            { label: "Honors & Scholarships", dated: true, cols: 2, list: [
              { t: "President's Scholarship", m: "2020 — 2022 · 2 yrs" },
              { t: "Merit Student", m: "2021 — 2022" },
              { t: "Outstanding Student Leader", m: "2019 — 2021 · 2 yrs" },
              { t: "Outstanding League Cadre", m: "2019 — 2022 · 3 yrs" },
              { t: "Outstanding Student Journalist", m: "2020 — 2021" },
              { t: "Outstanding Young Marxist Trainee", m: "2022" },
              { t: "Internet+ Competition, 3rd prize", m: "Jul 2020" },
            ] },
          ],
        },
      ],
    },
    zh: {
      kicker: "编者按",
      title: "亲爱的读者：",
      letter: [
        "本科四年，我在电子信息工程的世界里打磨逻辑，也在课余的缝隙中悄悄种下对新媒体的好奇。后来，我选择去上海交大读数字文创与管理——商科、工科、传播学在此交汇，像三条河流汇入同一片海。在实验室里，我第一次把 AI 技术从概念做成产品；在一次次项目与实习中，我逐渐辨认出自己真正想奔赴的方向。",
        "研二那年，我远赴比利时鲁汶大学交换。那段充实而特别的海外生活，进一步打开了我的视野——从此对未知的一切都充满好奇与探索欲，也热衷于倾听来自不同方向的声音。",
        "我是 5G 网速的互联网冲浪人，也是在 AI 浪潮里寻找一席之地的求职者。",
        "我愿张开双臂去拥抱这场浪潮，也始终相信：人与 AI 的结合，会生出无限可能。",
        "所以，我希望自己拥有源源不断的创造力，在 AI 的浪潮之下顺势而为、乘风破浪，在更优秀的平台上实现自己的价值，做出真正让用户受益、有意义的产品。",
      ],
      sign: "—— 张馨月，2026 年于上海",
      beliefsTitle: "我相信的几件事",
      beliefs: [
        { title: "始于用户问题", text: "不被技术逻辑带着跑。先想清楚用户要什么结果，再决定用哪个模型。" },
        { title: "立于用户价值", text: "不是卖功能、加广告，而是让用户觉得值。" },
        { title: "敢于做减法", text: "能用一个组件解决的，就不做两个功能。" },
        { title: "追问到根因", text: "从上传框报错追到后端参数，从召回异常追到游客 UID，不停在表面。" },
      ],
      skillsTitle: "我的工具箱",
      skills: [
        { name: "产品设计", items: "PRD 撰写 · Figma 原型 · 需求拆解 · 组件化设计 · 从 0 到 1" },
        { name: "AI 与 AIGC", items: "模型选型与评估 · Prompt 工程 · 多模型策略 · AI 工作流 · Skills" },
        { name: "增长与商业化", items: "订阅与积分体系 · 定价与权益 · A/B 实验 · GA4 埋点 · SQL" },
      ],
      beyondTitle: "工作之外",
      beyond: [
        { num: "180万+", text: "自媒体账号累计曝光，100+ 篇笔记" },
        { num: "400+ 人", text: "联合创业的摄影工作室，独立运营社群" },
        { num: "4 次", text: "支教与公益实践" },
      ],
      beyondPhotos: [
        { src: "assets/img/beyond-2020-lhasa.jpg", cap: "2020 年 · 西藏拉萨" },
        { src: "assets/img/beyond-2022-tianjin.jpg", cap: "2022 年 · 天津" },
        { src: "assets/img/beyond-2023-guilin.jpg", cap: "2023 年 · 广西桂林" },
      ],
      honorsLabel: "荣誉",
      campus: [
        {
          title: "In SJTU",
          sub: "上海交通大学 · 数字文创与管理硕士 · 2023 — 2026",
          photo: "assets/img/sjtu-graduation.jpg", accent: "#C8161D", logo: "assets/img/sjtu-logo.png", // 交大红 + 透明底校徽
          roles: ["2026 届优秀毕业生", "团支书", "文体部干事"],
          details: [
            { label: "专业方向", text: "本专业着重培养数字文创领域管理与领导创新型人才，聚焦六个相互关联的方向，形成立体化教学体系：",
              tags: ["策展与数字文博", "影视与数字媒体", "数字音乐与管理", "人工智能与创新设计", "数字传播与品牌管理", "数智传播与非遗保护"] },
            { label: "核心课程", tags: ["数字文创产业调研", "人工智能艺术装置", "人工智能与认知", "媒介经营管理", "新媒体研究", "商务沟通", "公司财务"] },
            // half：两项并排（左校园经历、右荣誉与奖学金）；板块已是 In SJTU，荣誉名省去「上海交通大学」前缀
            { label: "校园经历", half: true, list: [
              // y：时间（靠右）；href：标题链接
              { t: "蓟州文旅数字化实践", y: "2024.07", href: "https://mp.weixin.qq.com/s/hL5Y-aHfNQCJvX3a5ofF8w",
                m: "在天津市蓟州区开展专业实践调研：走访当地标志性人文景点，访谈居民与游客，分析文旅产业痛点，并结合 CG 技术、IP 形象设计与互动体验产品开发，为蓟州区打造独具特色的 IP 品牌落地方案。" },
            ] },
            { label: "荣誉与奖学金", half: true, dated: true, list: [
              { t: "优秀毕业生", m: "2026 年" },
              { t: "三好学生", m: "2024 — 2025 学年" },
              { t: "优秀共青团干部", m: "2023 — 2024 学年" },
              { t: "优秀共青团员", m: "2023 — 2024 学年" },
              { t: "学业奖学金", m: "2023 — 2024、2024 — 2025 学年" },
            ] },
          ],
        },
        {
          title: "In TGU",
          sub: "天津工业大学 · 电子信息工程学士 · 2019 — 2023",
          accent: "#6A2564", photoSide: "right", photo: "assets/img/tgu-campus.jpg", logo: "assets/img/tgu-logo.png", // 天工大紫（取自校徽）；照片在右，和 In SJTU 左右交替
          roles: ["团支书", "新媒体中心新闻部部长", "优秀学生记者"],
          details: [
            { label: "学生工作", list: [
              { t: "电子 1906 团支部 · 团支书", y: "2019.09 — 2023.06",
                m: "带领支部获 2019 年天津工业大学团支部风采大赛三等奖、2022 年天津工业大学优秀班集体。" },
              { t: "电子与信息工程学院新媒体中心 · 新闻部部长", y: "2019.09 — 2022.09",
                m: "负责文案撰写、活动策划、视频剪辑和摄影：累计策划推送 80 余篇、编辑文案近 100 篇，拍摄校运会、保研经验分享、就业招聘等校级院级活动 30 余次，共参与推送 1000 余篇、编辑视频 40 余次。" },
              { t: "第二届「清正廉明」研究会 · 学生监督员", y: "2021.09 — 2022.09",
                m: "配合驻校纪检监察组开展食堂价格与服务专项监督，收集学生意见 2800+ 份；参与策划 2021 年「学党史 颂廉洁 传家风」廉洁文化作品展，获师生广泛好评。" },
            ] },
            { label: "新媒体成绩", aside: true, stats: [
              { n: "4000+", l: "单篇最高阅读量" },
              { n: "1000+", l: "任职期间粉丝增长" },
              { n: "2.3 万+", l: "多渠道分享次数" },
            ] },
            { label: "荣誉与奖学金", dated: true, cols: 2, list: [
              { t: "校长奖学金", m: "2020 — 2022 · 两学年" },
              { t: "优秀三好学生", m: "2021 — 2022 学年" },
              { t: "优秀学生干部", m: "2019 — 2021 · 两学年" },
              { t: "优秀共青团干部", m: "2019 — 2022 · 三学年" },
              { t: "优秀学生记者", m: "2020 — 2021 学年" },
              { t: "青年马克思培养工程优秀学员", m: "2022 年" },
              { t: "「互联网+」创新创业大赛三等奖", m: "2020.07" },
            ] },
          ],
        },
      ],
    },
  },

  /* ---------- 作品集 Portfolio（顶部「作品集」tab） ----------
   * portfolio.html 是首页（介绍 + 三个入口），portfolio.html?id=aigc / photo / edit 是详情页。
   * 详情页（v2.33 起）：居中标题 + 照片球。所有 groups 里的作品合在一起放进球里；没有作品时显示 30 个彩色占位块，
   * 少于 24 个会循环铺满。悬停放大并显示 title；点击弹出详情窗（大图 / 视频 / 标题 / 说明 / 外链按钮）。
   * 作品 items 的写法（不分语言的直接写字符串，分语言的写 { en: "", zh: "" }）：
   *   { type: "image", src: "assets/portfolio/photo/xx.jpg", title: { en: "", zh: "" }, desc: { en: "", zh: "" } }
   *   { type: "video", src: "assets/portfolio/aigc/xx.mp4", poster: "xx.jpg", title: ... }   球上显示 poster，弹窗里播放（有声音）
   *   { type: "youtube", id: "视频ID", poster: "封面.jpg", title: ... }                       弹窗里直接播放
   *   { type: "link", href: "https://v.douyin.com/...", poster: "封面.jpg", platform: { en: "Douyin", zh: "抖音" }, title: ... }
   *       弹窗里有「抖音 ↗」按钮；加 direct: true 则点击图片直接跳转
   *   任何作品都可以加 href：弹窗里出现「查看原作 ↗」按钮；加 thumb：球上用小图，弹窗用 src 大图
   */
  portfolio: {
    en: {
      kicker: "Portfolio",
      title: "Step by Step,\nFrame by Frame", // \n：扉页大标题在这里换行
      intro: [
        "I love capturing life through a lens: taking photos, editing vlogs, and even running a photo studio with friends. Now I've brought that love into AI, creating visuals I never could before.",
        "As a longtime fan, I also picked up a whole set of fandom skills: designing posters, making fan edits and creating merch. AI keeps making it easier to turn ideas into reality, and every time an idea truly comes to life, it gives me a huge sense of achievement.",
      ],
    },
    zh: {
      kicker: "作品集",
      title: "Step by Step,\nFrame by Frame", // \n：扉页大标题在这里换行
      intro: [
        "我喜欢用镜头记录生活——拍照、剪 vlog，也曾和朋友一起开过摄影工作室。如今，我把这份热爱带进了 AI，做出从前做不出来的画面。",
        "作为一个早期追星人，我还练就了一身“追星必备技能”：做海报、剪二创视频、做物料。AI 的出现让创意的落地变得越来越容易，每当一个想法被真正实现，我都会收获巨大的成就感。",
      ],
    },
    entries: [
      /* ---------- 01 AIGC ---------- */
      {
        id: "aigc", no: "01",
        bg: "#C9DCE6", coverColor: "#16222E", paper: "#4F6F8C", // paper：纸团颜色
        cover: { type: "type" }, // 封面图到位后改成 { type: "image", src: "assets/portfolio/aigc/cover.jpg", titled: true }
        en: {
          kicker: "AIGC",
          title: "Developing Imagination",
          short: "Developing Imagination", unfold: "Letting AI develop the images in my mind, one frame at a time.", // unfold：纸团展开后纸上印的一句话
          line: "Videos and images I created with generative models",
          lead: "I build AI generation products by day, and I create with them too. Here are videos and images I made with different models.",
        },
        zh: {
          kicker: "AIGC",
          title: "想象力的显影室",
          short: "想象力的显影室", unfold: "借 AI 之手，让脑海里的画面一张张显影。",
          line: "我用各种生成模型做的视频和图片",
          lead: "白天做 AI 生成产品，自己也用它来创作。这里是我用不同模型做的视频和图片。",
        },
        groups: [
          // front: 1 / 2 / 3 = 打开时放在球正面赤道居中最显眼的三格（从左到右，2 在正中）
          // 视频：原片在 materials/作品集/aigc/，已转成网页通用的 H.264（v01.mp4…），v01.jpg 是封面，v01-t.jpg 是球上的小图
          { title: { en: "Videos", zh: "视频" }, items: [
            { type: "video", src: "assets/portfolio/aigc/v01.mp4", poster: "assets/portfolio/aigc/v01.jpg", thumb: "assets/portfolio/aigc/v01-t.jpg", title: "Minimax H3", front: 1 },
            { type: "video", src: "assets/portfolio/aigc/v02.mp4", poster: "assets/portfolio/aigc/v02.jpg", thumb: "assets/portfolio/aigc/v02-t.jpg", title: "Seedance 2.5", front: 2 },
            { type: "video", src: "assets/portfolio/aigc/v03.mp4", poster: "assets/portfolio/aigc/v03.jpg", thumb: "assets/portfolio/aigc/v03-t.jpg", title: "Seedream 5 pro" },
            { type: "video", src: "assets/portfolio/aigc/v04.mp4", poster: "assets/portfolio/aigc/v04.jpg", thumb: "assets/portfolio/aigc/v04-t.jpg", title: "CPP — Seedance", front: 3 },
            { type: "video", src: "assets/portfolio/aigc/v05.mp4", poster: "assets/portfolio/aigc/v05.jpg", thumb: "assets/portfolio/aigc/v05-t.jpg", title: "Marketing Studio — UGC Blindbox" },
            { type: "video", src: "assets/portfolio/aigc/v06.mp4", poster: "assets/portfolio/aigc/v06.jpg", thumb: "assets/portfolio/aigc/v06-t.jpg", title: "2026 · VerseIn" },
            { type: "video", src: "assets/portfolio/aigc/v07.mp4", poster: "assets/portfolio/aigc/v07.jpg", thumb: "assets/portfolio/aigc/v07-t.jpg", title: "2026 · VerseIn" },
            { type: "video", src: "assets/portfolio/aigc/v08.mp4", poster: "assets/portfolio/aigc/v08.jpg", thumb: "assets/portfolio/aigc/v08-t.jpg", title: "2026 · VerseIn" },
            { type: "video", src: "assets/portfolio/aigc/v09.mp4", poster: "assets/portfolio/aigc/v09.jpg", thumb: "assets/portfolio/aigc/v09-t.jpg", title: "2026 · VerseIn" },
            { type: "video", src: "assets/portfolio/aigc/v10.mp4", poster: "assets/portfolio/aigc/v10.jpg", thumb: "assets/portfolio/aigc/v10-t.jpg", title: "2026 · VerseIn" },
            { type: "video", src: "assets/portfolio/aigc/v11.mp4", poster: "assets/portfolio/aigc/v11.jpg", thumb: "assets/portfolio/aigc/v11-t.jpg", title: "2026 · VerseIn" },
            { type: "video", src: "assets/portfolio/aigc/v12.mp4", poster: "assets/portfolio/aigc/v12.jpg", thumb: "assets/portfolio/aigc/v12-t.jpg", title: "2026 · VerseIn" },
            { type: "video", src: "assets/portfolio/aigc/v13.mp4", poster: "assets/portfolio/aigc/v13.jpg", thumb: "assets/portfolio/aigc/v13-t.jpg", title: "2026 · VerseIn" },
            { type: "video", src: "assets/portfolio/aigc/v14.mp4", poster: "assets/portfolio/aigc/v14.jpg", thumb: "assets/portfolio/aigc/v14-t.jpg", title: "2026 · VerseIn" },
            { type: "video", src: "assets/portfolio/aigc/v15.mp4", poster: "assets/portfolio/aigc/v15.jpg", thumb: "assets/portfolio/aigc/v15-t.jpg", title: "Clone" },
            { type: "video", src: "assets/portfolio/aigc/v16.mp4", poster: "assets/portfolio/aigc/v16.jpg", thumb: "assets/portfolio/aigc/v16-t.jpg", title: "Dragon" },
            { type: "video", src: "assets/portfolio/aigc/v17.mp4", poster: "assets/portfolio/aigc/v17.jpg", thumb: "assets/portfolio/aigc/v17-t.jpg", title: "Food" },
            { type: "video", src: "assets/portfolio/aigc/v18.mp4", poster: "assets/portfolio/aigc/v18.jpg", thumb: "assets/portfolio/aigc/v18-t.jpg", title: "Hook Basketball" },
            { type: "video", src: "assets/portfolio/aigc/v19.mp4", poster: "assets/portfolio/aigc/v19.jpg", thumb: "assets/portfolio/aigc/v19-t.jpg", title: "Mint Choco Popcorn" },
            { type: "video", src: "assets/portfolio/aigc/v20.mp4", poster: "assets/portfolio/aigc/v20.jpg", thumb: "assets/portfolio/aigc/v20-t.jpg", title: "My Picky Cat" },
            { type: "video", src: "assets/portfolio/aigc/v21.mp4", poster: "assets/portfolio/aigc/v21.jpg", thumb: "assets/portfolio/aigc/v21-t.jpg", title: "Neo" },
            { type: "video", src: "assets/portfolio/aigc/v22.mp4", poster: "assets/portfolio/aigc/v22.jpg", thumb: "assets/portfolio/aigc/v22-t.jpg", title: "Picnic Paws Ad" },
            { type: "video", src: "assets/portfolio/aigc/v23.mp4", poster: "assets/portfolio/aigc/v23.jpg", thumb: "assets/portfolio/aigc/v23-t.jpg", title: "Rasengan" },
            { type: "video", src: "assets/portfolio/aigc/v24.mp4", poster: "assets/portfolio/aigc/v24.jpg", thumb: "assets/portfolio/aigc/v24-t.jpg", title: "Toy Collector" },
            { type: "video", src: "assets/portfolio/aigc/v25.mp4", poster: "assets/portfolio/aigc/v25.jpg", thumb: "assets/portfolio/aigc/v25-t.jpg", title: "UCG Blind Box" },
            { type: "video", src: "assets/portfolio/aigc/v26.mp4", poster: "assets/portfolio/aigc/v26.jpg", thumb: "assets/portfolio/aigc/v26-t.jpg", title: "UCG Snack Review" },
            { type: "video", src: "assets/portfolio/aigc/v27.mp4", poster: "assets/portfolio/aigc/v27.jpg", thumb: "assets/portfolio/aigc/v27-t.jpg", title: "Y2K Freefall" },
          ] },
          { title: { en: "Images", zh: "图片" }, items: [
            { tbd: true, ratio: "4 / 5" }, { tbd: true, ratio: "1 / 1" }, { tbd: true, ratio: "4 / 5" },
            { tbd: true, ratio: "1 / 1" }, { tbd: true, ratio: "4 / 5" }, { tbd: true, ratio: "1 / 1" },
          ] },
        ],
      },

      /* ---------- 02 摄影 ---------- */
      {
        id: "photo", no: "02",
        bg: "#EBD3CC", coverColor: "#4A2A26", paper: "#9C5B52",
        cover: { type: "type" },
        en: {
          kicker: "Photography",
          title: "Life Through the Viewfinder",
          short: "Life Through the Viewfinder", unfold: "Collecting the unnoticed light of everyday life through a lens.",
          line: "Portraits, travel and everyday moments",
          lead: "Portraits, travel and everyday moments. I also co-ran a photo studio with friends, handling everything from shooting to retouching.",
        },
        zh: {
          kicker: "摄影",
          title: "取景框里的日常",
          short: "取景框里的日常", unfold: "用镜头收集生活里不经意的光。",
          line: "人像、旅行和日常",
          lead: "人像、旅行和日常。我也和朋友一起开过摄影工作室，从拍摄到修图都自己来。",
        },
        groups: [
          // 38 张照片，按时间排序；原图在 materials/作品集/photo/，文件名「年份·地点」→ title（弹窗底部显示）
          { items: [
            { type: "image", src: "assets/portfolio/photo/p01.jpg", thumb: "assets/portfolio/photo/p01-t.jpg", title: { zh: "2020 · 乌镇", en: "2020 · Wuzhen" } }, // 2020·乌镇 (2).png
            { type: "image", src: "assets/portfolio/photo/p02.jpg", thumb: "assets/portfolio/photo/p02-t.jpg", title: { zh: "2020 · 乌镇", en: "2020 · Wuzhen" } }, // 2020·乌镇 (3).png
            { type: "image", src: "assets/portfolio/photo/p03.jpg", thumb: "assets/portfolio/photo/p03-t.jpg", title: { zh: "2020 · 乌镇", en: "2020 · Wuzhen" } }, // 2020·乌镇.png
            { type: "image", src: "assets/portfolio/photo/p04.jpg", thumb: "assets/portfolio/photo/p04-t.jpg", title: { zh: "2020 · 天津", en: "2020 · Tianjin" } }, // 2020·天津-1.png
            { type: "image", src: "assets/portfolio/photo/p05.jpg", thumb: "assets/portfolio/photo/p05-t.jpg", title: { zh: "2020 · 天津", en: "2020 · Tianjin" } }, // 2020·天津.jpg
            { type: "image", src: "assets/portfolio/photo/p06.jpg", thumb: "assets/portfolio/photo/p06-t.jpg", title: { zh: "2020 · 天津", en: "2020 · Tianjin" } }, // 2020·天津.png
            { type: "image", src: "assets/portfolio/photo/p07.jpg", thumb: "assets/portfolio/photo/p07-t.jpg", title: { zh: "2020 · 成都", en: "2020 · Chengdu" } }, // 2020·成都.png
            { type: "image", src: "assets/portfolio/photo/p08.jpg", thumb: "assets/portfolio/photo/p08-t.jpg", title: { zh: "2021 · 天津", en: "2021 · Tianjin" } }, // 2021·天津-1.png
            { type: "image", src: "assets/portfolio/photo/p09.jpg", thumb: "assets/portfolio/photo/p09-t.jpg", title: { zh: "2021 · 天津", en: "2021 · Tianjin" } }, // 2021·天津-2.png
            { type: "image", src: "assets/portfolio/photo/p10.jpg", thumb: "assets/portfolio/photo/p10-t.jpg", title: { zh: "2021 · 天津", en: "2021 · Tianjin" } }, // 2021·天津-3.png
            { type: "image", src: "assets/portfolio/photo/p11.jpg", thumb: "assets/portfolio/photo/p11-t.jpg", title: { zh: "2021 · 天津", en: "2021 · Tianjin" } }, // 2021·天津-4.png
            { type: "image", src: "assets/portfolio/photo/p12.jpg", thumb: "assets/portfolio/photo/p12-t.jpg", title: { zh: "2021 · 天津", en: "2021 · Tianjin" } }, // 2021·天津.png
            { type: "image", src: "assets/portfolio/photo/p13.jpg", thumb: "assets/portfolio/photo/p13-t.jpg", title: { zh: "2021 · 河南", en: "2021 · Henan" } }, // 2021·河南.png
            { type: "image", src: "assets/portfolio/photo/p14.jpg", thumb: "assets/portfolio/photo/p14-t.jpg", title: { zh: "2021 · 洛阳", en: "2021 · Luoyang" } }, // 2021·洛阳.png
            { type: "image", src: "assets/portfolio/photo/p15.jpg", thumb: "assets/portfolio/photo/p15-t.jpg", title: { zh: "2021 · 西安", en: "2021 · Xi'an" } }, // 2021·西安 (2).png
            { type: "image", src: "assets/portfolio/photo/p16.jpg", thumb: "assets/portfolio/photo/p16-t.jpg", title: { zh: "2021 · 西安", en: "2021 · Xi'an" } }, // 2021·西安 (3).png
            { type: "image", src: "assets/portfolio/photo/p17.jpg", thumb: "assets/portfolio/photo/p17-t.jpg", title: { zh: "2021 · 西安", en: "2021 · Xi'an" } }, // 2021·西安 (4).png
            { type: "image", src: "assets/portfolio/photo/p18.jpg", thumb: "assets/portfolio/photo/p18-t.jpg", title: { zh: "2021 · 西安", en: "2021 · Xi'an" } }, // 2021·西安.png
            { type: "image", src: "assets/portfolio/photo/p19.jpg", thumb: "assets/portfolio/photo/p19-t.jpg", title: { zh: "2021 · 贵阳", en: "2021 · Guiyang" } }, // 2021·贵阳.png
            { type: "image", src: "assets/portfolio/photo/p20.jpg", thumb: "assets/portfolio/photo/p20-t.jpg", title: { zh: "2022 · 天津", en: "2022 · Tianjin" } }, // 2022·天津.png
            { type: "image", src: "assets/portfolio/photo/p21.jpg", thumb: "assets/portfolio/photo/p21-t.jpg", title: { zh: "2022 · 黔南布依族苗族自治州", en: "2022 · Qiannan, Guizhou" } }, // 2022·黔南布依族苗族自治州.png
            { type: "image", src: "assets/portfolio/photo/p22.jpg", thumb: "assets/portfolio/photo/p22-t.jpg", title: { zh: "2023 · 千户苗寨", en: "2023 · Xijiang Miao Village" } }, // 2023·千户苗寨.png
            { type: "image", src: "assets/portfolio/photo/p23.jpg", thumb: "assets/portfolio/photo/p23-t.jpg", title: { zh: "2023 · 贵阳", en: "2023 · Guiyang" } }, // 2023·贵阳 (2).png
            { type: "image", src: "assets/portfolio/photo/p24.jpg", thumb: "assets/portfolio/photo/p24-t.jpg", title: { zh: "2023 · 贵阳", en: "2023 · Guiyang" } }, // 2023·贵阳.png
            { type: "image", src: "assets/portfolio/photo/p25.jpg", thumb: "assets/portfolio/photo/p25-t.jpg", title: { zh: "2025 · 冰岛", en: "2025 · Iceland" } }, // 2025·冰岛-2.jpg
            { type: "image", src: "assets/portfolio/photo/p26.jpg", thumb: "assets/portfolio/photo/p26-t.jpg", title: { zh: "2025 · 冰岛", en: "2025 · Iceland" } }, // 2025·冰岛-·.jpg
            { type: "image", src: "assets/portfolio/photo/p27.jpg", thumb: "assets/portfolio/photo/p27-t.jpg", title: { zh: "2025 · 冰岛", en: "2025 · Iceland" } }, // 2025·冰岛.jpg
            { type: "image", src: "assets/portfolio/photo/p28.jpg", thumb: "assets/portfolio/photo/p28-t.jpg", title: { zh: "2025 · 北京鸟巢", en: "2025 · Bird's Nest, Beijing" } }, // 2025·北京鸟巢-1.jpg
            { type: "image", src: "assets/portfolio/photo/p29.jpg", thumb: "assets/portfolio/photo/p29-t.jpg", title: { zh: "2025 · 北京鸟巢", en: "2025 · Bird's Nest, Beijing" } }, // 2025·北京鸟巢-2.jpg
            { type: "image", src: "assets/portfolio/photo/p30.jpg", thumb: "assets/portfolio/photo/p30-t.jpg", title: { zh: "2025 · 北京鸟巢", en: "2025 · Bird's Nest, Beijing" } }, // 2025·北京鸟巢.jpg
            { type: "image", src: "assets/portfolio/photo/p31.jpg", thumb: "assets/portfolio/photo/p31-t.jpg", title: { zh: "2025 · 新加坡", en: "2025 · Singapore" } }, // 2025·新加坡.jpg
            { type: "image", src: "assets/portfolio/photo/p32.jpg", thumb: "assets/portfolio/photo/p32-t.jpg", title: { zh: "2025 · 新疆禾木", en: "2025 · Hemu, Xinjiang" } }, // 2025·新疆禾木-1.jpg
            { type: "image", src: "assets/portfolio/photo/p33.jpg", thumb: "assets/portfolio/photo/p33-t.jpg", title: { zh: "2025 · 新疆禾木", en: "2025 · Hemu, Xinjiang" } }, // 2025·新疆禾木.jpg
            { type: "image", src: "assets/portfolio/photo/p34.jpg", thumb: "assets/portfolio/photo/p34-t.jpg", title: { zh: "2025 · 瑞士First山", en: "2025 · First, Switzerland" } }, // 2025·瑞士First山.jpg
            { type: "image", src: "assets/portfolio/photo/p35.jpg", thumb: "assets/portfolio/photo/p35-t.jpg", title: { zh: "2026 · 宏村", en: "2026 · Hongcun" } }, // 2026·宏村-·.jpg
            { type: "image", src: "assets/portfolio/photo/p36.jpg", thumb: "assets/portfolio/photo/p36-t.jpg", title: { zh: "2026 · 宏村", en: "2026 · Hongcun" } }, // 2026·宏村.jpg
            { type: "image", src: "assets/portfolio/photo/p37.jpg", thumb: "assets/portfolio/photo/p37-t.jpg", title: { zh: "2026 · 富士山", en: "2026 · Mount Fuji" } }, // 2026·富士山.jpg
            { type: "image", src: "assets/portfolio/photo/p38.jpg", thumb: "assets/portfolio/photo/p38-t.jpg", title: { zh: "2026 · 西澳", en: "2026 · Western Australia" } }, // 2026·西澳.jpg
          ] },

        ],
      },

      /* ---------- 03 剪辑 ---------- */
      {
        id: "edit", no: "03",
        bg: "#D9D9B8", coverColor: "#2E3020", paper: "#6F7248",
        cover: { type: "type" },
        en: {
          kicker: "Editing / Creation",
          title: "Passion Squared",
          short: "Passion Squared", unfold: "From fan edits to AI in practice: passion, squared.",
          line: "Videos I edited myself, including AIGC shorts",
          lead: "Videos I shot and edited myself, plus short films cut from AI-generated footage.",
        },
        zh: {
          kicker: "剪辑 / 创作",
          title: "热爱的二次方",
          short: "热爱的二次方", unfold: "从追星二创到 AI 落地，热爱被平方。",
          line: "自己剪的视频，也有 AIGC 短片",
          lead: "自己拍、自己剪的视频，还有用 AI 生成素材剪出来的短片。",
        },
        groups: [
          // 抖音二创：点开先放大显示封面（poster），下方「抖音 ↗」跳转；封面原图在 materials/作品集/edit/
          { title: { en: "My edits", zh: "剪辑作品" }, items: [
            { type: "link", href: "https://v.douyin.com/iM-ToTwCoF8/", poster: "assets/portfolio/edit/d01.jpg", thumb: "assets/portfolio/edit/d01-t.jpg", platform: { en: "Douyin", zh: "抖音" },
              title: { zh: "张艺兴新歌戏腔硬控我两小时", en: "Lay Zhang's new song, opera-style vocals" } },
            { type: "link", href: "https://v.douyin.com/o-312B4K72c/", poster: "assets/portfolio/edit/d03.jpg", thumb: "assets/portfolio/edit/d03-t.jpg", platform: { en: "Douyin", zh: "抖音" },
              title: { zh: "「ep01」兴壳小羊你在哪！", en: "Ep01: Little sheep, where are you?" } },
            { type: "link", href: "https://v.douyin.com/K8AYg-IEMEg/", poster: "assets/portfolio/edit/d04.jpg", thumb: "assets/portfolio/edit/d04-t.jpg", platform: { en: "Douyin", zh: "抖音" },
              title: { zh: "「ep02」贝小兴他硬要跳 nobody", en: "Ep02: Lay insists on dancing to Nobody" } },
            { type: "link", href: "https://v.douyin.com/NGB8b3Hfqg4/", poster: "assets/portfolio/edit/d05.jpg", thumb: "assets/portfolio/edit/d05-t.jpg", platform: { en: "Douyin", zh: "抖音" },
              title: { zh: "「ep03」贝小兴：你补药过来啊！", en: "Ep03: Don't come over here!" } },
            { type: "link", href: "https://v.douyin.com/e8rmiChZP5o/", poster: "assets/portfolio/edit/d06.jpg", thumb: "assets/portfolio/edit/d06-t.jpg", platform: { en: "Douyin", zh: "抖音" },
              title: { zh: "「ep04」我的头发才不是锅盖！", en: "Ep04: My hair is NOT a bowl cut!" } },
            { type: "link", href: "https://v.douyin.com/Gw2rPfM7KYw/", poster: "assets/portfolio/edit/d02.jpg", thumb: "assets/portfolio/edit/d02-t.jpg", platform: { en: "Douyin", zh: "抖音" },
              title: { zh: "「ep05」贝小兴 boss 上班日", en: "Ep05: Boss Lay goes to work" } },
            // 设计与视频（原件在 materials/作品集/edit/）。gallery：名字相近的放在同一个缩略图里，点开并排显示；tall：长图，点开可上下滚动
            { type: "image", src: "assets/portfolio/edit/g01.jpg", thumb: "assets/portfolio/edit/g01-t.jpg", tall: true,
              title: { zh: "2020 · 社团招新易拉宝", en: "2020 · Club recruitment banner" } },
            { type: "video", src: "assets/portfolio/edit/e01.mp4", poster: "assets/portfolio/edit/e01.jpg", thumb: "assets/portfolio/edit/e01-t.jpg",
              title: { zh: "2020 · 自制混剪视频 · 张艺兴", en: "2020 · Lay Zhang fan edit" } },
            { type: "gallery", thumb: "assets/portfolio/edit/g02a-t.jpg", images: ["assets/portfolio/edit/g02a.jpg", "assets/portfolio/edit/g02b.jpg"],
              title: { zh: "2021 · 摄影工作室 · 海报", en: "2021 · Photo studio posters" } },
            { type: "gallery", thumb: "assets/portfolio/edit/g03a-t.jpg", images: ["assets/portfolio/edit/g03a.jpg", { src: "assets/portfolio/edit/g03b.jpg", tall: true }],
              title: { zh: "2021 · 摄影工作室 · 活动海报", en: "2021 · Photo studio event posters" } },
            { type: "video", src: "assets/portfolio/edit/e02.mp4", poster: "assets/portfolio/edit/e02-cover.jpg", thumb: "assets/portfolio/edit/e02-cover-t.jpg", // 封面用《一口甜》
              title: { zh: "2021 · 自制 cp 向视频 · 《我在他乡挺好的》", en: "2021 · Fan-made couple edit: I'm Doing Fine Far From Home" } },
            { type: "video", src: "assets/portfolio/edit/e03.mp4", poster: "assets/portfolio/edit/e03.jpg", thumb: "assets/portfolio/edit/e03-t.jpg",
              title: { zh: "2024 · 天津蓟州实践短片", en: "2024 · Jizhou, Tianjin field-practice short film" } },
            { type: "video", src: "assets/portfolio/edit/e04.mp4", poster: "assets/portfolio/edit/e04.jpg", thumb: "assets/portfolio/edit/e04-t.jpg",
              title: { zh: "2025 · 《菠萝的海》展览纪录片", en: "2025 · Sea of Pineapples exhibition documentary" } },
            // PPT：原件在 materials/作品集/edit/*.pptx；ppt/deckNN-t.jpg 是第一页小图，ppt/deckNN/sXXX.jpg 是每一页；点开 4 页一版、左右翻
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck01-t.jpg", slides: ["assets/portfolio/edit/ppt/deck01/s001.jpg", "assets/portfolio/edit/ppt/deck01/s002.jpg", "assets/portfolio/edit/ppt/deck01/s003.jpg"], title: { zh: "2023 · Alibaba", en: "2023 · Alibaba" } }, // Alibaba.pptx，3 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck02-t.jpg", slides: ["assets/portfolio/edit/ppt/deck02/s001.jpg", "assets/portfolio/edit/ppt/deck02/s002.jpg", "assets/portfolio/edit/ppt/deck02/s003.jpg", "assets/portfolio/edit/ppt/deck02/s004.jpg", "assets/portfolio/edit/ppt/deck02/s005.jpg", "assets/portfolio/edit/ppt/deck02/s006.jpg", "assets/portfolio/edit/ppt/deck02/s007.jpg", "assets/portfolio/edit/ppt/deck02/s008.jpg", "assets/portfolio/edit/ppt/deck02/s009.jpg", "assets/portfolio/edit/ppt/deck02/s010.jpg", "assets/portfolio/edit/ppt/deck02/s011.jpg", "assets/portfolio/edit/ppt/deck02/s012.jpg", "assets/portfolio/edit/ppt/deck02/s013.jpg"], title: { zh: "2024 · Beyoncé", en: "2024 · Beyoncé" } }, // Beyonce.pptx，13 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck03-t.jpg", slides: ["assets/portfolio/edit/ppt/deck03/s001.jpg", "assets/portfolio/edit/ppt/deck03/s002.jpg", "assets/portfolio/edit/ppt/deck03/s003.jpg", "assets/portfolio/edit/ppt/deck03/s004.jpg"], title: { zh: "2024 · Luckin Coffee in Thailand", en: "2024 · Luckin Coffee in Thailand" } }, // content-Luckin Coffee in Thailand.pptx，4 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck04-t.jpg", slides: ["assets/portfolio/edit/ppt/deck04/s001.jpg", "assets/portfolio/edit/ppt/deck04/s002.jpg", "assets/portfolio/edit/ppt/deck04/s003.jpg", "assets/portfolio/edit/ppt/deck04/s004.jpg", "assets/portfolio/edit/ppt/deck04/s005.jpg", "assets/portfolio/edit/ppt/deck04/s006.jpg", "assets/portfolio/edit/ppt/deck04/s007.jpg", "assets/portfolio/edit/ppt/deck04/s008.jpg", "assets/portfolio/edit/ppt/deck04/s009.jpg", "assets/portfolio/edit/ppt/deck04/s010.jpg", "assets/portfolio/edit/ppt/deck04/s011.jpg", "assets/portfolio/edit/ppt/deck04/s012.jpg", "assets/portfolio/edit/ppt/deck04/s013.jpg", "assets/portfolio/edit/ppt/deck04/s014.jpg", "assets/portfolio/edit/ppt/deck04/s015.jpg"], title: { zh: "2024 · From iStock to iStuck：生成式 AI 如何改变图库行业", en: "2024 · From iStock to iStuck: How Generative AI Is Transforming the Stock Image Industry" } }, // From iStock to iStuck How Generative AI is Transforming Stock Image Industry.pptx，15 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck05-t.jpg", slides: ["assets/portfolio/edit/ppt/deck05/s001.jpg", "assets/portfolio/edit/ppt/deck05/s002.jpg", "assets/portfolio/edit/ppt/deck05/s003.jpg", "assets/portfolio/edit/ppt/deck05/s004.jpg", "assets/portfolio/edit/ppt/deck05/s005.jpg", "assets/portfolio/edit/ppt/deck05/s006.jpg", "assets/portfolio/edit/ppt/deck05/s007.jpg", "assets/portfolio/edit/ppt/deck05/s008.jpg", "assets/portfolio/edit/ppt/deck05/s009.jpg", "assets/portfolio/edit/ppt/deck05/s010.jpg", "assets/portfolio/edit/ppt/deck05/s011.jpg", "assets/portfolio/edit/ppt/deck05/s012.jpg", "assets/portfolio/edit/ppt/deck05/s013.jpg", "assets/portfolio/edit/ppt/deck05/s014.jpg", "assets/portfolio/edit/ppt/deck05/s015.jpg", "assets/portfolio/edit/ppt/deck05/s016.jpg", "assets/portfolio/edit/ppt/deck05/s017.jpg", "assets/portfolio/edit/ppt/deck05/s018.jpg", "assets/portfolio/edit/ppt/deck05/s019.jpg", "assets/portfolio/edit/ppt/deck05/s020.jpg", "assets/portfolio/edit/ppt/deck05/s021.jpg", "assets/portfolio/edit/ppt/deck05/s022.jpg", "assets/portfolio/edit/ppt/deck05/s023.jpg", "assets/portfolio/edit/ppt/deck05/s024.jpg", "assets/portfolio/edit/ppt/deck05/s025.jpg", "assets/portfolio/edit/ppt/deck05/s026.jpg", "assets/portfolio/edit/ppt/deck05/s027.jpg", "assets/portfolio/edit/ppt/deck05/s028.jpg", "assets/portfolio/edit/ppt/deck05/s029.jpg", "assets/portfolio/edit/ppt/deck05/s030.jpg", "assets/portfolio/edit/ppt/deck05/s031.jpg", "assets/portfolio/edit/ppt/deck05/s032.jpg"], title: { zh: "2024 · I'm Dating an AI Chatbot", en: "2024 · I'm Dating an AI Chatbot" } }, // I'm Dating an AI Chatbot.pptx，32 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck06-t.jpg", slides: ["assets/portfolio/edit/ppt/deck06/s001.jpg", "assets/portfolio/edit/ppt/deck06/s002.jpg", "assets/portfolio/edit/ppt/deck06/s003.jpg", "assets/portfolio/edit/ppt/deck06/s004.jpg", "assets/portfolio/edit/ppt/deck06/s005.jpg", "assets/portfolio/edit/ppt/deck06/s006.jpg", "assets/portfolio/edit/ppt/deck06/s007.jpg", "assets/portfolio/edit/ppt/deck06/s008.jpg", "assets/portfolio/edit/ppt/deck06/s009.jpg", "assets/portfolio/edit/ppt/deck06/s010.jpg", "assets/portfolio/edit/ppt/deck06/s011.jpg", "assets/portfolio/edit/ppt/deck06/s012.jpg", "assets/portfolio/edit/ppt/deck06/s013.jpg", "assets/portfolio/edit/ppt/deck06/s014.jpg", "assets/portfolio/edit/ppt/deck06/s015.jpg", "assets/portfolio/edit/ppt/deck06/s016.jpg", "assets/portfolio/edit/ppt/deck06/s017.jpg", "assets/portfolio/edit/ppt/deck06/s018.jpg", "assets/portfolio/edit/ppt/deck06/s019.jpg", "assets/portfolio/edit/ppt/deck06/s020.jpg", "assets/portfolio/edit/ppt/deck06/s021.jpg", "assets/portfolio/edit/ppt/deck06/s022.jpg", "assets/portfolio/edit/ppt/deck06/s023.jpg", "assets/portfolio/edit/ppt/deck06/s024.jpg", "assets/portfolio/edit/ppt/deck06/s025.jpg", "assets/portfolio/edit/ppt/deck06/s026.jpg", "assets/portfolio/edit/ppt/deck06/s027.jpg", "assets/portfolio/edit/ppt/deck06/s028.jpg", "assets/portfolio/edit/ppt/deck06/s029.jpg", "assets/portfolio/edit/ppt/deck06/s030.jpg", "assets/portfolio/edit/ppt/deck06/s031.jpg", "assets/portfolio/edit/ppt/deck06/s032.jpg", "assets/portfolio/edit/ppt/deck06/s033.jpg", "assets/portfolio/edit/ppt/deck06/s034.jpg", "assets/portfolio/edit/ppt/deck06/s035.jpg", "assets/portfolio/edit/ppt/deck06/s036.jpg", "assets/portfolio/edit/ppt/deck06/s037.jpg", "assets/portfolio/edit/ppt/deck06/s038.jpg", "assets/portfolio/edit/ppt/deck06/s039.jpg", "assets/portfolio/edit/ppt/deck06/s040.jpg", "assets/portfolio/edit/ppt/deck06/s041.jpg", "assets/portfolio/edit/ppt/deck06/s042.jpg", "assets/portfolio/edit/ppt/deck06/s043.jpg", "assets/portfolio/edit/ppt/deck06/s044.jpg", "assets/portfolio/edit/ppt/deck06/s045.jpg", "assets/portfolio/edit/ppt/deck06/s046.jpg", "assets/portfolio/edit/ppt/deck06/s047.jpg"], title: { zh: "2024 · lululemon", en: "2024 · lululemon" } }, // lululemon.pptx，47 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck07-t.jpg", slides: ["assets/portfolio/edit/ppt/deck07/s001.jpg", "assets/portfolio/edit/ppt/deck07/s002.jpg", "assets/portfolio/edit/ppt/deck07/s003.jpg", "assets/portfolio/edit/ppt/deck07/s004.jpg", "assets/portfolio/edit/ppt/deck07/s005.jpg", "assets/portfolio/edit/ppt/deck07/s006.jpg", "assets/portfolio/edit/ppt/deck07/s007.jpg", "assets/portfolio/edit/ppt/deck07/s008.jpg"], title: { zh: "2023 · Bilibili 研究报告", en: "2023 · Bilibili report" } }, // ME Group6 Bilibili report-final.pptx，8 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck08-t.jpg", slides: ["assets/portfolio/edit/ppt/deck08/s001.jpg", "assets/portfolio/edit/ppt/deck08/s002.jpg", "assets/portfolio/edit/ppt/deck08/s003.jpg", "assets/portfolio/edit/ppt/deck08/s004.jpg", "assets/portfolio/edit/ppt/deck08/s005.jpg", "assets/portfolio/edit/ppt/deck08/s006.jpg", "assets/portfolio/edit/ppt/deck08/s007.jpg", "assets/portfolio/edit/ppt/deck08/s008.jpg", "assets/portfolio/edit/ppt/deck08/s009.jpg", "assets/portfolio/edit/ppt/deck08/s010.jpg", "assets/portfolio/edit/ppt/deck08/s011.jpg", "assets/portfolio/edit/ppt/deck08/s012.jpg", "assets/portfolio/edit/ppt/deck08/s013.jpg", "assets/portfolio/edit/ppt/deck08/s014.jpg", "assets/portfolio/edit/ppt/deck08/s015.jpg", "assets/portfolio/edit/ppt/deck08/s016.jpg", "assets/portfolio/edit/ppt/deck08/s017.jpg", "assets/portfolio/edit/ppt/deck08/s018.jpg", "assets/portfolio/edit/ppt/deck08/s019.jpg", "assets/portfolio/edit/ppt/deck08/s020.jpg"], title: { zh: "2024 · 字节跳动研究报告", en: "2024 · ByteDance report" } }, // ME Group6 Bytedance final.pptx，20 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck09-t.jpg", slides: ["assets/portfolio/edit/ppt/deck09/s001.jpg", "assets/portfolio/edit/ppt/deck09/s002.jpg", "assets/portfolio/edit/ppt/deck09/s003.jpg", "assets/portfolio/edit/ppt/deck09/s004.jpg", "assets/portfolio/edit/ppt/deck09/s005.jpg", "assets/portfolio/edit/ppt/deck09/s006.jpg"], title: { zh: "2023 · MPOP Content Review", en: "2023 · MPOP Content Review" } }, // MPOP_Content Review.pptx，6 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck10-t.jpg", slides: ["assets/portfolio/edit/ppt/deck10/s001.jpg", "assets/portfolio/edit/ppt/deck10/s002.jpg", "assets/portfolio/edit/ppt/deck10/s003.jpg", "assets/portfolio/edit/ppt/deck10/s004.jpg", "assets/portfolio/edit/ppt/deck10/s005.jpg", "assets/portfolio/edit/ppt/deck10/s006.jpg", "assets/portfolio/edit/ppt/deck10/s007.jpg", "assets/portfolio/edit/ppt/deck10/s008.jpg", "assets/portfolio/edit/ppt/deck10/s009.jpg", "assets/portfolio/edit/ppt/deck10/s010.jpg", "assets/portfolio/edit/ppt/deck10/s011.jpg", "assets/portfolio/edit/ppt/deck10/s012.jpg", "assets/portfolio/edit/ppt/deck10/s013.jpg", "assets/portfolio/edit/ppt/deck10/s014.jpg", "assets/portfolio/edit/ppt/deck10/s015.jpg", "assets/portfolio/edit/ppt/deck10/s016.jpg", "assets/portfolio/edit/ppt/deck10/s017.jpg", "assets/portfolio/edit/ppt/deck10/s018.jpg", "assets/portfolio/edit/ppt/deck10/s019.jpg", "assets/portfolio/edit/ppt/deck10/s020.jpg", "assets/portfolio/edit/ppt/deck10/s021.jpg", "assets/portfolio/edit/ppt/deck10/s022.jpg", "assets/portfolio/edit/ppt/deck10/s023.jpg", "assets/portfolio/edit/ppt/deck10/s024.jpg", "assets/portfolio/edit/ppt/deck10/s025.jpg", "assets/portfolio/edit/ppt/deck10/s026.jpg", "assets/portfolio/edit/ppt/deck10/s027.jpg", "assets/portfolio/edit/ppt/deck10/s028.jpg", "assets/portfolio/edit/ppt/deck10/s029.jpg", "assets/portfolio/edit/ppt/deck10/s030.jpg", "assets/portfolio/edit/ppt/deck10/s031.jpg", "assets/portfolio/edit/ppt/deck10/s032.jpg", "assets/portfolio/edit/ppt/deck10/s033.jpg", "assets/portfolio/edit/ppt/deck10/s034.jpg", "assets/portfolio/edit/ppt/deck10/s035.jpg", "assets/portfolio/edit/ppt/deck10/s036.jpg", "assets/portfolio/edit/ppt/deck10/s037.jpg", "assets/portfolio/edit/ppt/deck10/s038.jpg", "assets/portfolio/edit/ppt/deck10/s039.jpg"], title: { zh: "2024 · 霸王年轻化国潮洗护品牌重塑提案", en: "2024 · Rebranding Bawang as a youthful guochao haircare brand" } }, // 霸王年轻化国潮洗护品牌重塑提案.pptx，39 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck11-t.jpg", slides: ["assets/portfolio/edit/ppt/deck11/s001.jpg", "assets/portfolio/edit/ppt/deck11/s002.jpg", "assets/portfolio/edit/ppt/deck11/s003.jpg", "assets/portfolio/edit/ppt/deck11/s004.jpg", "assets/portfolio/edit/ppt/deck11/s005.jpg", "assets/portfolio/edit/ppt/deck11/s006.jpg", "assets/portfolio/edit/ppt/deck11/s007.jpg", "assets/portfolio/edit/ppt/deck11/s008.jpg", "assets/portfolio/edit/ppt/deck11/s009.jpg", "assets/portfolio/edit/ppt/deck11/s010.jpg", "assets/portfolio/edit/ppt/deck11/s011.jpg", "assets/portfolio/edit/ppt/deck11/s012.jpg", "assets/portfolio/edit/ppt/deck11/s013.jpg", "assets/portfolio/edit/ppt/deck11/s014.jpg", "assets/portfolio/edit/ppt/deck11/s015.jpg", "assets/portfolio/edit/ppt/deck11/s016.jpg", "assets/portfolio/edit/ppt/deck11/s017.jpg", "assets/portfolio/edit/ppt/deck11/s018.jpg", "assets/portfolio/edit/ppt/deck11/s019.jpg", "assets/portfolio/edit/ppt/deck11/s020.jpg", "assets/portfolio/edit/ppt/deck11/s021.jpg", "assets/portfolio/edit/ppt/deck11/s022.jpg", "assets/portfolio/edit/ppt/deck11/s023.jpg", "assets/portfolio/edit/ppt/deck11/s024.jpg", "assets/portfolio/edit/ppt/deck11/s025.jpg", "assets/portfolio/edit/ppt/deck11/s026.jpg", "assets/portfolio/edit/ppt/deck11/s027.jpg", "assets/portfolio/edit/ppt/deck11/s028.jpg", "assets/portfolio/edit/ppt/deck11/s029.jpg"], title: { zh: "2024 · 海上博物", en: "2024 · Museum of the Sea" } }, // 海上博物.pptx，29 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck12-t.jpg", slides: ["assets/portfolio/edit/ppt/deck12/s001.jpg", "assets/portfolio/edit/ppt/deck12/s002.jpg", "assets/portfolio/edit/ppt/deck12/s003.jpg", "assets/portfolio/edit/ppt/deck12/s004.jpg", "assets/portfolio/edit/ppt/deck12/s005.jpg", "assets/portfolio/edit/ppt/deck12/s006.jpg", "assets/portfolio/edit/ppt/deck12/s007.jpg", "assets/portfolio/edit/ppt/deck12/s008.jpg", "assets/portfolio/edit/ppt/deck12/s009.jpg", "assets/portfolio/edit/ppt/deck12/s010.jpg", "assets/portfolio/edit/ppt/deck12/s011.jpg", "assets/portfolio/edit/ppt/deck12/s012.jpg", "assets/portfolio/edit/ppt/deck12/s013.jpg", "assets/portfolio/edit/ppt/deck12/s014.jpg", "assets/portfolio/edit/ppt/deck12/s015.jpg", "assets/portfolio/edit/ppt/deck12/s016.jpg", "assets/portfolio/edit/ppt/deck12/s017.jpg", "assets/portfolio/edit/ppt/deck12/s018.jpg", "assets/portfolio/edit/ppt/deck12/s019.jpg", "assets/portfolio/edit/ppt/deck12/s020.jpg", "assets/portfolio/edit/ppt/deck12/s021.jpg", "assets/portfolio/edit/ppt/deck12/s022.jpg", "assets/portfolio/edit/ppt/deck12/s023.jpg", "assets/portfolio/edit/ppt/deck12/s024.jpg", "assets/portfolio/edit/ppt/deck12/s025.jpg"], title: { zh: "2024 · 恐怖美学研究与中西恐怖电影分析", en: "2024 · Horror aesthetics in Chinese and Western film" } }, // 恐怖美学研究与中西恐怖电影分析.pptx，25 页
            { type: "deck", thumb: "assets/portfolio/edit/ppt/deck13-t.jpg", slides: ["assets/portfolio/edit/ppt/deck13/s001.jpg", "assets/portfolio/edit/ppt/deck13/s002.jpg", "assets/portfolio/edit/ppt/deck13/s003.jpg", "assets/portfolio/edit/ppt/deck13/s004.jpg", "assets/portfolio/edit/ppt/deck13/s005.jpg", "assets/portfolio/edit/ppt/deck13/s006.jpg", "assets/portfolio/edit/ppt/deck13/s007.jpg", "assets/portfolio/edit/ppt/deck13/s008.jpg", "assets/portfolio/edit/ppt/deck13/s009.jpg", "assets/portfolio/edit/ppt/deck13/s010.jpg", "assets/portfolio/edit/ppt/deck13/s011.jpg", "assets/portfolio/edit/ppt/deck13/s012.jpg", "assets/portfolio/edit/ppt/deck13/s013.jpg", "assets/portfolio/edit/ppt/deck13/s014.jpg", "assets/portfolio/edit/ppt/deck13/s015.jpg", "assets/portfolio/edit/ppt/deck13/s016.jpg", "assets/portfolio/edit/ppt/deck13/s017.jpg", "assets/portfolio/edit/ppt/deck13/s018.jpg", "assets/portfolio/edit/ppt/deck13/s019.jpg", "assets/portfolio/edit/ppt/deck13/s020.jpg", "assets/portfolio/edit/ppt/deck13/s021.jpg", "assets/portfolio/edit/ppt/deck13/s022.jpg"], title: { zh: "2024 · 人工智能艺术装置", en: "2024 · AI art installation" } }, // 人工智能艺术装置.pptx，22 页
          ] },
          { title: { en: "AIGC shorts", zh: "AIGC 短片" }, layout: "reels", items: [
            { tbd: true, ratio: "9 / 16" }, { tbd: true, ratio: "9 / 16" }, { tbd: true, ratio: "9 / 16" },
          ] },
        ],
      },
    ],
  },

  /* ---------- 封底 Contact ---------- */
  contact: {
    art: "assets/img/back-wave.webp", // 封底右下角的蜡笔插画（用户提供）
    en: {
      kicker: "Back Cover",
      title: "Let's talk.",
      sub: "", // 已删除
      links: [
        { label: "Email", value: "xinyue2002666@163.com", href: "mailto:xinyue2002666@163.com" },
        { label: "Phone", value: "+86 188 2222 8139", href: "tel:+8618822228139" },
        { label: "WeChat", value: "Unilantern_02", href: "", qr: "assets/img/wechat-card.jpg" },
        { label: "LinkedIn", value: "Xinyue Zhang", href: "https://www.linkedin.com/in/xinyue-zhang-29a544351/" },
        { label: "Résumé (EN)", value: "PDF", href: "assets/resume/resume-en.pdf", preview: "assets/resume/resume-en.webp", resume: true, download: "Xinyue Zhang-Shanghai Jiao Tong University-18822228139.pdf" },
        { label: "Résumé (CN)", value: "PDF", href: "assets/resume/resume-zh.pdf", preview: "assets/resume/resume-zh.webp", resume: true, download: "张馨月-上海交通大学-18822228139.pdf" },
      ],
    },
    zh: {
      kicker: "封底",
      title: "Let's talk.", // 中文版也用英文
      sub: "", // 已删除「正在寻找 AI 产品经理的机会」
      links: [
        { label: "邮箱", value: "xinyue2002666@163.com", href: "mailto:xinyue2002666@163.com" },
        { label: "电话", value: "+86 188 2222 8139", href: "tel:+8618822228139" },
        { label: "微信", value: "Unilantern_02", href: "", qr: "assets/img/wechat-card.jpg" },
        { label: "LinkedIn", value: "Xinyue Zhang", href: "https://www.linkedin.com/in/xinyue-zhang-29a544351/" },
        { label: "英文简历", value: "PDF", href: "assets/resume/resume-en.pdf", preview: "assets/resume/resume-en.webp", resume: true, download: "Xinyue Zhang-Shanghai Jiao Tong University-18822228139.pdf" },
        { label: "中文简历", value: "PDF", href: "assets/resume/resume-zh.pdf", preview: "assets/resume/resume-zh.webp", resume: true, download: "张馨月-上海交通大学-18822228139.pdf" },
      ],
    },
  },
};

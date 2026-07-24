const cursor=document.getElementById("cursor");const follower=document.getElementById("cursor-follower");const timelineProgress=document.getElementById("timeline-progress");const timelineContainer=document.querySelector(".timeline-container");const timelineItems=document.querySelectorAll(".timeline-item, .sub-timeline-item",);let mouseX=0,mouseY=0;let posX=0,posY=0;let fX=0,fY=0;let targetTimelineProgress=0;let currentTimelineProgress=0;document.addEventListener("mousemove",(e)=>{mouseX=e.clientX;mouseY=e.clientY});function animate(){if(cursor&&follower){posX+=(mouseX-posX)*0.2;posY+=(mouseY-posY)*0.2;fX+=(mouseX-fX)*0.1;fY+=(mouseY-fY)*0.1;cursor.style.transform=`translate3d(${posX}px, ${posY}px, 0)`;follower.style.transform=`translate3d(${fX - 15}px, ${fY - 15}px, 0)`}
if(timelineProgress){currentTimelineProgress+=(targetTimelineProgress-currentTimelineProgress)*0.12;timelineProgress.style.height=`${currentTimelineProgress * 100}%`}
requestAnimationFrame(animate)}
animate();const magElements=document.querySelectorAll(".mag");magElements.forEach((el)=>{el.addEventListener("mousemove",(e)=>{const rect=el.getBoundingClientRect();const x=e.clientX-rect.left-rect.width/2;const y=e.clientY-rect.top-rect.height/2;el.style.transform=`translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;follower.style.transform=`translate3d(${fX - 15}px, ${fY - 15}px, 0) scale(1.5)`;follower.style.borderColor="var(--primary)"});el.addEventListener("mouseleave",()=>{el.style.transform=`translate3d(0, 0, 0)`;follower.style.transform=`translate3d(${fX - 15}px, ${fY - 15}px, 0) scale(1)`;follower.style.borderColor="rgba(0, 0, 0, 0.1)"})});const reveals=document.querySelectorAll(".reveal");const revealObserver=new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add("active");revealObserver.unobserve(entry.target)}})},{threshold:0.1,rootMargin:"0px 0px -50px 0px"},);reveals.forEach((el)=>revealObserver.observe(el));const subTimelineItems=document.querySelectorAll(".sub-timeline-item");const subTimelines=document.querySelectorAll(".sub-timeline");subTimelines.forEach((timeline)=>{const items=timeline.querySelectorAll(".sub-timeline-item");items.forEach((item,i)=>{item.style.transitionDelay=`${i * 0.1}s`})});const subTimelineObserver=new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add("revealed");subTimelineObserver.unobserve(entry.target)}})},{threshold:0.1,rootMargin:"0px 0px -40px 0px"},);subTimelineItems.forEach((item)=>subTimelineObserver.observe(item));function updateSubTimelineProgress(){subTimelines.forEach((timeline)=>{const rect=timeline.getBoundingClientRect();const winH=window.innerHeight;const startOffset=winH*0.75;const progress=Math.max(0,Math.min(1,(startOffset-rect.top)/rect.height),);timeline.style.setProperty("--scroll-progress",`${progress * 100}%`)})}
updateSubTimelineProgress();const navLinks=document.querySelectorAll(".nav-links-reference a, .nav-overlay-links a",);const sections=document.querySelectorAll("section[id], #hero");function updateActiveNav(){let currentSectionId="";sections.forEach((section)=>{const sectionTop=section.offsetTop;const sectionHeight=section.clientHeight;if(window.scrollY>=sectionTop-150){currentSectionId=section.getAttribute("id")}});navLinks.forEach((link)=>{link.classList.remove("active-pill");const href=link.getAttribute("href");if(href===`#${currentSectionId}`||(currentSectionId==="hero"&&href==="#hero")){link.classList.add("active-pill")}})}
const navBar=document.querySelector(".nav-reference");let isScrolling=!1;window.addEventListener("scroll",()=>{if(!isScrolling){requestAnimationFrame(()=>{const scrollPos=window.scrollY;if(scrollPos>50){navBar.classList.add("scrolled")}else{navBar.classList.remove("scrolled")}
const aboutSection=document.getElementById("about");let activeColor="#fcfbf7";document.querySelectorAll(".timeline-item").forEach((item)=>{const rect=item.getBoundingClientRect();const winH=window.innerHeight;if(rect.top<winH*0.7&&rect.bottom>winH*0.3){activeColor=item.getAttribute("data-color")||"#fcfbf7"}
const img=item.querySelector(".parallax-img");if(img){const pRect=img.parentElement.getBoundingClientRect();if(pRect.top<winH&&pRect.bottom>0){const shift=(winH-pRect.top)*0.12;img.style.transform=`translate3d(0, -${shift}px, 0)`}}});if(aboutSection){aboutSection.style.backgroundColor=activeColor}
updateActiveNav();updateSubTimelineProgress()})}},{passive:!0},);updateActiveNav();updateSubTimelineProgress();document.querySelectorAll('a[href^="#"]').forEach((anchor)=>{anchor.addEventListener("click",function(e){e.preventDefault();isScrolling=!0;navLinks.forEach((link)=>link.classList.remove("active-pill"));this.classList.add("active-pill");const target=document.querySelector(this.getAttribute("href"));if(target){window.scrollTo({top:target.offsetTop-80,behavior:"smooth"});setTimeout(()=>{isScrolling=!1;updateActiveNav()},800)}else{isScrolling=!1}})});const menuOpen=document.getElementById("menu-open");const menuClose=document.getElementById("nav-close");const navOverlay=document.getElementById("nav-overlay");function openNav(){navOverlay.classList.add("open");document.body.style.overflow="hidden"}
function closeNav(){navOverlay.classList.remove("open");document.body.style.overflow="auto"}
if(menuOpen)menuOpen.addEventListener("click",openNav);if(menuClose)menuClose.addEventListener("click",closeNav);document.querySelectorAll(".nav-overlay-links a").forEach((link)=>{link.addEventListener("click",closeNav)});window.addEventListener("scroll",()=>{const scrollPos=window.pageYOffset;document.querySelectorAll(".giant-text").forEach((text,i)=>{text.style.transform=`translate3d(0, ${scrollPos * 0.15}px, 0)`})},{passive:!0},);const contactForm=document.getElementById("contact-form");const submitBtn=document.getElementById("submit-btn");const successModal=document.getElementById("success-modal");if(contactForm){let isHuman=!1;contactForm.addEventListener("focusin",()=>{isHuman=!0},{once:!0},);contactForm.addEventListener("mousemove",()=>{isHuman=!0},{once:!0},);const sanitize=(str)=>{return str.replace(/[&<>"']/g,(m)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;",})[m],).trim()};contactForm.addEventListener("submit",async(e)=>{e.preventDefault();if(!isHuman){console.warn("Submission blocked: No human interaction detected.");return}
const FORMSPREE_ID=atob("xbdeeaaa");const FORMSPREE_URL=`https://formspree.io/f/${FORMSPREE_ID}`;const submitTextEl=submitBtn.querySelector("span");const submitIconEl=submitBtn.querySelector("i");const originalText=submitTextEl.innerText;submitTextEl.innerText=currentLang==="en"?"Sending...":"पठाउँदै...";submitIconEl.className="fas fa-spinner fa-spin";submitBtn.style.opacity="0.7";submitBtn.style.pointerEvents="none";try{const formData=new FormData(contactForm);const sanitizedData=new FormData();for(let[key,value]of formData.entries()){sanitizedData.append(key,sanitize(value))}
const response=await fetch(FORMSPREE_URL,{method:"POST",body:sanitizedData,headers:{Accept:"application/json"},});if(response.ok){if(successModal){successModal.classList.add("active");document.body.style.overflow="hidden"}
contactForm.reset()}else{throw new Error("Formspree error")}}catch(error){console.error("Submission error:",error);if(FORMSPREE_ID==="YOUR_ID_HERE"){successModal.classList.add("active");contactForm.reset()}else{alert(currentLang==="en"?"Failed to send message. Please try again.":"सन्देश पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोला।",)}}finally{submitTextEl.innerText=originalText;submitIconEl.className="fas fa-paper-plane";submitBtn.style.opacity="1";submitBtn.style.pointerEvents="all"}})}
function closeSuccessModal(){const sModal=document.getElementById("success-modal");if(sModal){sModal.classList.remove("active");document.body.style.overflow="auto"}}
const lightbox=document.getElementById("lightbox-modal");const lightboxImg=document.getElementById("lightbox-img");function openLightbox(src){if(!lightbox||!lightboxImg)return;lightboxImg.src=src;lightbox.classList.add("active");document.body.style.overflow="hidden"}
window.closeLightbox=function(){if(!lightbox)return;lightbox.classList.remove("active");document.body.style.overflow="auto"};if(lightbox){lightbox.addEventListener("click",(e)=>{if(e.target===lightbox||e.target.id==="lightbox-close"){closeLightbox()}})}
document.querySelectorAll(".gallery-item").forEach((item)=>{item.addEventListener("click",()=>{const img=item.querySelector("img");if(img)openLightbox(img.src);})});function bindAccordion(){document.querySelectorAll(".vision-item-hdr").forEach(function(btn){btn.addEventListener("click",function(){var item=btn.closest(".vision-item");var body=item.querySelector(".vision-item-body");var isOpen=item.classList.contains("open");document.querySelectorAll(".vision-item").forEach(function(i){i.classList.remove("open");i.querySelector(".vision-item-hdr").setAttribute("aria-expanded","false",);var otherBody=i.querySelector(".vision-item-body");if(otherBody){otherBody.style.maxHeight=null}});if(!isOpen){item.classList.add("open");btn.setAttribute("aria-expanded","true");if(body){body.style.maxHeight=body.scrollHeight+28+"px"}}})})}
function renderVision(){const accordion=document.getElementById("vision-accordion");if(!accordion)return;accordion.innerHTML="";const vData=getVisionData();const grid=document.createElement("div");grid.className="vision-card-grid";const panel=document.createElement("div");panel.className="vision-detail-panel";panel.innerHTML="";vData.forEach((item,idx)=>{const card=document.createElement("div");card.className="vision-item reveal";card.dataset.idx=idx;card.innerHTML=`
            <button class="vision-item-hdr" aria-expanded="false" data-idx="${idx}">
                <span class="vision-icon-box"><i class="${item.icon}"></i></span>
                <h3>${item.title}</h3>
                <span class="vision-chevron"><i class="fas fa-chevron-down"></i></span>
            </button>
        `;grid.appendChild(card);if(typeof revealObserver!=="undefined"){revealObserver.observe(card)}});accordion.appendChild(grid);accordion.appendChild(panel);grid.querySelectorAll(".vision-item-hdr").forEach((btn)=>{btn.addEventListener("click",function(){const clickedIdx=parseInt(this.dataset.idx);const card=this.closest(".vision-item");const isOpen=card.classList.contains("open");grid.querySelectorAll(".vision-item").forEach((c)=>{c.classList.remove("open");c.querySelector(".vision-item-hdr").setAttribute("aria-expanded","false",)});if(isOpen){panel.classList.remove("open");panel.innerHTML=""}else{card.classList.add("open");this.setAttribute("aria-expanded","true");const item=getVisionData()[clickedIdx];const subsHtml=item.subs.map((sub)=>{const listItems=sub.items.map((li)=>`<li>${li}</li>`).join("");const labelHtml=sub.label?`<div class="vision-sub-title"><i class="fas fa-angle-right"></i> ${sub.label}</div>`:"";return `<div class="vision-sub">${labelHtml}<ul>${listItems}</ul></div>`}).join("");panel.innerHTML=`
                    <div class="vision-panel-inner">
                        <div class="vision-panel-heading">
                            <span class="vision-icon-box"><i class="${item.icon}"></i></span>
                            <h4>${item.title}</h4>
                        </div>
                        ${subsHtml}
                    </div>
                `;panel.classList.add("open");setTimeout(()=>{panel.scrollIntoView({behavior:"smooth",block:"nearest"})},80)}})})}
function renderAchievements(){const timeline=document.getElementById("ach-timeline");if(!timeline)return;timeline.innerHTML="";getAchievementsData().forEach((item)=>{const el=document.createElement("div");el.className="ach-item reveal";el.innerHTML=`
            <div class="ach-year">${item.year}</div>
            <div class="ach-connector">
                <div class="ach-dot"></div>
                <div class="ach-line"></div>
            </div>
            <div class="ach-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;timeline.appendChild(el);if(typeof revealObserver!=="undefined"){revealObserver.observe(el)}})}
function renderDialogues(){const dialogueGrid=document.getElementById("dialogue-grid");if(!dialogueGrid)return;dialogueGrid.innerHTML="";getDialogueData().forEach((item,index)=>{const card=document.createElement("div");card.className=`dialogue-card reveal ${item.isFeatured ? "featured" : ""}`;if(item.link&&item.link!=="#"){card.style.cursor="pointer";card.addEventListener("click",(e)=>{if(!e.target.closest("a")){window.open(item.link,"_blank")}})}
if(index>=5){card.classList.add("dialogue-card--hidden");card.style.display="none";card.style.opacity="0"}else{card.style.display="flex";card.style.opacity="1"}
let mediaHtml="";if(item.image){const overlayClass=item.isFeatured?"play-overlay":"play-overlay-small";mediaHtml=`
                <div class="dialogue-media">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="${overlayClass}"><i class="${item.mediaIcon || "fas fa-link"}"></i></div>
                </div>
            `}
const infoHtml=`
            <div class="dialogue-info">
                <span class="dialogue-category">${item.category}</span>
                <a href="${item.link}" ${item.link !== "#" ? 'target="_blank"' : ""} style="text-decoration: none; color: inherit;">
                    <h3 style="transition: color 0.3s;" onmouseover="this.style.color='var(--pr)'" onmouseout="this.style.color=''">
                        ${item.title}
                    </h3>
                </a>
                <p>${item.description}</p>
                <a href="${item.link}" ${item.link !== "#" ? 'target="_blank"' : ""} class="${item.isFeatured ? "btn-silk" : "btn-silk-text"}">
                    ${item.actionText} <i class="${item.actionIcon || "fas fa-chevron-right"}"></i>
                </a>
            </div>
        `;card.innerHTML=mediaHtml+infoHtml;dialogueGrid.appendChild(card);if(typeof revealObserver!=="undefined"){revealObserver.observe(card)}});const toggleBtn=document.querySelector(".dialogue-more-btn");if(toggleBtn){let hiddenIndex=0;const allCards=Array.from(dialogueGrid.querySelectorAll(".dialogue-card"),);const cardsToHide=allCards.slice(5);if(cardsToHide.length===0){toggleBtn.parentElement.style.display="none"}else{toggleBtn.parentElement.style.display="block"}
const newToggleBtn=toggleBtn.cloneNode(!0);toggleBtn.parentNode.replaceChild(newToggleBtn,toggleBtn);newToggleBtn.addEventListener("click",(e)=>{e.preventDefault();if(hiddenIndex<cardsToHide.length){cardsToHide.forEach((card)=>{card.style.display="flex";setTimeout(()=>{card.style.opacity="1";card.style.transform="translateY(0)"},50)});hiddenIndex=cardsToHide.length;newToggleBtn.innerHTML=`
                    <i class="fas fa-chevron-up"></i>
                    ${currentLang === "en" ? "Show Less" : "सरोकारहरू कम गर्नुहोस्"}
                    <i class="fas fa-chevron-up"></i>
                `}else{cardsToHide.forEach((card)=>{card.style.opacity="0";card.style.transform="translateY(20px)";setTimeout(()=>{card.style.display="none"},300)});hiddenIndex=0;newToggleBtn.innerHTML=`
                    <i class="fas fa-newspaper"></i>
                    ${currentLang === "en" ? "View More" : "थप सरोकारहरू हेर्नुहोस्"}
                    <i class="fas fa-chevron-down"></i>
                `}})}}
function setVideoThumbnail(imgElement,videoId){if(!imgElement)return;const tempImg=new Image();tempImg.onload=function(){if(tempImg.naturalWidth&&tempImg.naturalWidth<=120){imgElement.src=`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}else{imgElement.src=`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}};tempImg.onerror=function(){imgElement.src=`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`};tempImg.src=`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
function renderYouTubeSection(){const pvidGrid=document.getElementById("pvid-grid");if(!pvidGrid)return;pvidGrid.innerHTML="";const featuredContainer=document.getElementById("featured-video-container");if(featuredContainer){featuredContainer.onclick=function(e){e.preventDefault();const videoId=this.getAttribute("data-video-id");if(videoId){window.open(`https://www.youtube.com/watch?v=${videoId}`,"_blank")}}}
const allVideos=getYouTubeVideosData();const featuredVideo=allVideos.find((v)=>v.isFeatured);if(featuredVideo){const featuredThumb=document.getElementById("featured-video-thumb");const featuredTitle=document.getElementById("featured-video-title");const featuredDesc=document.getElementById("featured-video-desc");const featuredTagsContainer=document.getElementById("featured-video-tags",);if(featuredThumb){setVideoThumbnail(featuredThumb,featuredVideo.videoId);featuredThumb.alt=featuredVideo.title}
if(featuredTitle)featuredTitle.textContent=featuredVideo.title;if(featuredDesc)featuredDesc.textContent=featuredVideo.desc;if(featuredContainer)
featuredContainer.setAttribute("data-video-id",featuredVideo.videoId);if(featuredTagsContainer){featuredTagsContainer.innerHTML="";(featuredVideo.tags||[]).forEach((tag)=>{const trimmed=tag.trim();if(trimmed){const span=document.createElement("span");span.className="parliament-tag";span.textContent=trimmed;featuredTagsContainer.appendChild(span)}})}}
const secondaryVideos=allVideos.filter((v)=>!v.isFeatured);secondaryVideos.forEach((video,index)=>{const card=document.createElement("div");card.className="pvid-card reveal";if(index>=4){card.classList.add("pvid-card--hidden");card.style.display="none";card.style.opacity="0"}else{card.style.display="block";card.style.opacity="1"}
card.setAttribute("data-video-id",video.videoId);card.setAttribute("data-title",video.title);card.setAttribute("data-desc",video.desc);card.setAttribute("data-tags",video.tags.join(","));const tagsHtml=(video.tags||[]).map((tag)=>{const trimmed=tag.trim();return trimmed?`<span class="parliament-tag">${trimmed}</span>`:""}).join("");const tagsWrapper=tagsHtml?`<div class="pvid-tags" style="margin-top: 4px;">${tagsHtml}</div>`:"";card.innerHTML=`
            <div class="pvid-thumb-wrap">
                <img class="pvid-thumb" src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg" alt="${video.title}">
                <div class="pvid-play-overlay"><i class="fas fa-play"></i></div>
            </div>
            <div class="pvid-card-info">
                <h4>${video.title}</h4>
                ${tagsWrapper}
                ${video.stat ? `<span class="pvid-stat"><i class="${video.statIcon || "fas fa-info-circle"}"></i>${video.stat}</span>` : ""}
            </div>
        `;card.addEventListener("click",function(e){e.preventDefault();const videoId=this.getAttribute("data-video-id");if(videoId){window.open(`https://www.youtube.com/watch?v=${videoId}`,"_blank")}});pvidGrid.appendChild(card);if(typeof revealObserver!=="undefined"){revealObserver.observe(card)}});const toggleBtn=document.querySelector(".pvid-more-btn");if(toggleBtn){let hiddenIndex=0;const allCards=Array.from(pvidGrid.querySelectorAll(".pvid-card"));const cardsToHide=allCards.slice(4);if(cardsToHide.length===0){toggleBtn.style.display="none"}else{toggleBtn.style.display="inline-flex"}
const newToggleBtn=toggleBtn.cloneNode(!0);toggleBtn.parentNode.replaceChild(newToggleBtn,toggleBtn);newToggleBtn.addEventListener("click",(e)=>{e.preventDefault();if(hiddenIndex<cardsToHide.length){cardsToHide.forEach((card)=>{card.style.display="block";setTimeout(()=>{card.style.opacity="1";card.style.transform="translateY(0)"},50)});hiddenIndex=cardsToHide.length;newToggleBtn.innerHTML=`
                    <i class="fas fa-chevron-up"></i>
                    ${currentLang === "en" ? "Show Less Videos" : "संसदका भिडियोहरू कम गर्नुहोस्"}
                    <i class="fas fa-chevron-up"></i>
                `}else{cardsToHide.forEach((card)=>{card.style.opacity="0";card.style.transform="translateY(20px)";setTimeout(()=>{card.style.display="none"},300)});hiddenIndex=0;newToggleBtn.innerHTML=`
                    <i class="fas fa-video"></i>
                    ${currentLang === "en" ? "View More Parliamentary Videos" : "संसदका थप भिडियोहरू अवलोकन गर्नुहोस्"}
                    <i class="fas fa-chevron-down"></i>
                `}})}}
function renderTimeline(containerId,dataArray){const container=document.getElementById(containerId);if(!container)return;container.innerHTML="";const lang=typeof currentLang!=="undefined"?currentLang:"ne";dataArray.forEach((item,i)=>{const eventsHtml=item.events.map((ev)=>{const text=typeof ev==="string"?ev:ev[lang]||ev.ne;return `<p class="tl-event">${text}</p>`}).join("");const tag=typeof item.tag==="string"?item.tag:item.tag[lang]||item.tag.ne;const year=typeof item.year==="string"?item.year:item.year[lang]||item.year.ne;const el=document.createElement("div");el.className="sub-timeline-item"+(item.highlight?" highlight":"");el.style.transitionDelay=`${i * 0.1}s`;el.innerHTML=`
            <div class="sub-timeline-dot"><i class="fas fa-star"></i></div>
            <div class="sub-timeline-content">
                <div class="sub-timeline-badge-row">
                    <span class="sub-timeline-tag">${tag}</span>
                    <span class="sub-timeline-year-inline">${year}</span>
                </div>
                ${eventsHtml}
            </div>
        `;container.appendChild(el);if(typeof subTimelineObserver!=="undefined"){subTimelineObserver.observe(el)}})}
document.addEventListener("DOMContentLoaded",()=>{renderVision();renderAchievements();renderDialogues();renderYouTubeSection();renderTimeline("student-timeline",studentTimelineData);renderTimeline("party-timeline",partyTimelineData);renderTimeline("public-role-timeline",publicRoleTimelineData);updateDOMTranslations()});let currentLang="ne";function updateDOMTranslations(){document.querySelectorAll("[data-tr]").forEach((el)=>{const key=el.getAttribute("data-tr");if(translations[key]){const translation=translations[key][currentLang];if(translation){if(translation.includes("<")&&translation.includes(">")){el.innerHTML=translation}else{el.textContent=translation}}}});document.querySelectorAll("[data-tr-placeholder]").forEach((el)=>{const key=el.getAttribute("data-tr-placeholder");if(translations[key]){const translation=translations[key][currentLang];if(translation){el.placeholder=translation}}});alignContactArrow();if(currentLang==="en"){document.title="Gopal Sharma — Member of the House of Representatives, Rukum West";const metaDesc=document.querySelector('meta[name="description"]');if(metaDesc)
metaDesc.content="Official portfolio and journey of Gopal Sharma, public representative from Rukum West."}else{document.title="गोपाल शर्मा — प्रतिनिधिसभा सदस्य, रुकुम पश्चिम";const metaDesc=document.querySelector('meta[name="description"]');if(metaDesc)
metaDesc.content="रुकुम पश्चिमका जनप्रतिनिधि गोपाल शर्माको आधिकारिक संकलन र कार्ययात्राको अभिलेख।"}}
function switchLanguage(lang){currentLang=lang;document.documentElement.setAttribute("lang",lang);document.querySelectorAll(".lang-btn").forEach((btn)=>{if(btn.getAttribute("data-lang-opt")===lang){btn.classList.add("active")}else{btn.classList.remove("active")}});updateDOMTranslations();renderVision();renderAchievements();renderDialogues();renderYouTubeSection();renderTimeline("student-timeline",studentTimelineData);renderTimeline("party-timeline",partyTimelineData);renderTimeline("public-role-timeline",publicRoleTimelineData);alignContactArrow()}
document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".lang-btn").forEach((btn)=>{btn.addEventListener("click",(e)=>{e.preventDefault();const lang=btn.getAttribute("data-lang-opt");if(lang){switchLanguage(lang)}})})});function resolveLang(obj){if(obj&&typeof obj==="object"&&("ne" in obj||"en" in obj)){return obj[currentLang]||obj.ne||""}
if(Array.isArray(obj)){return obj.map(resolveLang)}
if(obj&&typeof obj==="object"){const newObj={};for(const key in obj){newObj[key]=resolveLang(obj[key])}
return newObj}
return obj}
function getVisionData(){return resolveLang(visionData)}
function getAchievementsData(){return resolveLang(achievementsData)}
function getDialogueData(){return resolveLang(dialogueData)}
function getYouTubeVideosData(){return resolveLang(youtubeVideosData)}
function alignContactArrow(){const title=document.querySelector(".contact-title");const arrowWrap=document.querySelector(".contact-arrow-wrap");if(title&&arrowWrap){arrowWrap.style.width=title.offsetWidth+"px"}}
window.addEventListener("load",alignContactArrow);window.addEventListener("resize",alignContactArrow);function positionEnQuote(){const quote=document.getElementById("hpol-en-quote");if(!quote)return;const hero=document.querySelector(".hero-political");if(!hero)return;if(window.innerWidth>1024){quote.style.left="";quote.style.width="";return}
const heroRect=hero.getBoundingClientRect();const leftOffset=-heroRect.left;quote.style.left=leftOffset+"px";quote.style.width=window.innerWidth+"px"}
window.addEventListener("load",positionEnQuote);window.addEventListener("resize",positionEnQuote);document.addEventListener("langChange",positionEnQuote);setTimeout(positionEnQuote,100)
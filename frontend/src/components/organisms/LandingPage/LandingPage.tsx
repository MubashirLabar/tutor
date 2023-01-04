import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.scss";
import { createModuleStyleExtractor } from "../../../utils/css";
import curvyBottomBorderImage from "../../../assets/images/curvy-bottom-border.png"
import studentWithLaptopImage from "../../../assets/images/student-with-laptop.png"
import potImage from "../../../assets/images/pot.png"
import elipse from "../../../assets/images/Ellipse-in-landing-page.png"
import leaf from "../../../assets/images/leaf.png"
import rightCardImage from "../../../assets/images/right-card.png"
import leftCardImage from  "../../../assets/images/left-card.png"
import centerCardImage from "../../../assets/images/center-card.png"

import blueBg from "../../../assets/images/blue-bg.png"
import darkBlueBg from "../../../assets/images/dark-blue-bg.png"
import orangeBg from "../../../assets/images/orange-bg.png"

import curvyBorder2 from "../../../assets/images/curvy-border-2.png"
import studentWithBooks from "../../../assets/images/student-with-books.png"
import learningOnline from "../../../assets/images/learning-online.png"
import guarantee from "../../../assets/images/guarantee.png"
import people from "../../../assets/images/people.png"
import bottomCurveBorder from "../../../assets/images/bottom-most-curve-border.png"

import tencentlogo from "../../../assets/images/logos/tencent.png"
import neteaselogologo from "../../../assets/images/logos/neteaselogo.png"
import sohulogologo from "../../../assets/images/logos/sohulogo.png"
import sinalogologo from "../../../assets/images/logos/sinalogo.png"
import chinaDailylogo from "../../../assets/images/logos/china-daily-logo.png"
import ifenglogologo from "../../../assets/images/logos/ifenglogo.png"
import chinaDotComlogo from "../../../assets/images/logos/china.com.logo.png"
import chineselogo from "../../../assets/images/logos/chinese-logo.png"

const logos: string[] = [
	tencentlogo,
	neteaselogologo,
	sohulogologo,
	sinalogologo,
	chinaDailylogo,
	ifenglogologo,
	chinaDotComlogo,
	chineselogo,
]

const cx = createModuleStyleExtractor(styles);


export const LandingPage: FC = (/*{

} : {

}*/) => {
	return (
		// <div className={cx(["auth-container__row", "d-flex"])}>
		<div className={cx("outer-container")}>
			<div className={cx("section-1")}>
				<p className={cx("larger-heading")}>
					留洋通  留学生专属学习平台
				</p>

				<p className={cx("heading")}>
					所有留学生的共同选择
				</p>

				
				<Link to={'../auth?action=login'} className={cx("button")}>
					立刻下单
				</Link>

				<img
					className={cx("curvy-bottom-border")}
					src={curvyBottomBorderImage}
					alt=""
				/>

				<div className={cx("student-image-container")}>
					<img
						className={cx("student-with-laptop-image")}
						src={studentWithLaptopImage}
						alt=""
					/>					
				</div>

				<div className={cx("pot-image-container")}>
					<img
						className={cx("pot-image")}
						src={potImage}
						alt=""
					/>
				</div>

				<div className={cx("elipse-image-container")}>
					<img
						className={cx("elipse-image")}
						src={elipse}
						alt=""
					/>
				</div>

				<div className={cx("leaf-image-container")}>
					<img
						className={cx("leaf-image")}
						src={leaf}
						alt=""
					/>
				</div>
			</div>

			<div className={cx("section-2")}>
				<div className={cx("below-heading-container")}>
					<p className={cx("larger-heading-1")}>
						24/7 提交作业要求提交作业要求
					</p>
					<p className={cx("below-heading")}>
						提交作业要求, 提交作业要求, 提交作业要求 <br/>
						提交作业要求提交作, 提交作业要求提交作作
					</p>
					<p className={cx("heading")}>
						<span className={cx("more-bold")}>10000+</span> 提交作业要求
					</p>					
				</div>

				<div className={cx("card-container")}>
					<div className={cx("card")}>
						<img
							className={cx("card-image")}
							src={leftCardImage}
							alt=""
						/>
						<p className={cx("card-text")}>
							提交作业要求
						</p>
					</div>

					<div className={cx("card-center")}>
						<img
							className={cx("center-card-image")}
							src={centerCardImage}
							alt=""
						/>
						<p className={cx("card-text")}>
							提交作业要求
						</p>						
					</div>

					<div className={cx("card-right")}>
						<img
							className={cx("right-card-image")}
							src={rightCardImage}
							alt=""
						/>
						<p className={cx("card-text")}>
							提交作业要求
						</p>
					</div>
				</div>

				<button className={cx("button")}>
					提交作业要求
				</button>
			</div>

			<div className={cx("section-3")}>
				<img
					className={cx("curvy-border")}
					src={curvyBorder2}
					alt=""
				/>
				<div className={cx("container")}>
					<div className={cx("text-container")}>
						<p className={cx("heading")}>
							自学专区
						</p>
						<p className={cx("text")}>
							各種熱門提升GPA必修的大学课程，有一对一专业老师给你提供中文讲解，打破语言障碍帶来的学习上的困难，可以让留学生轻易拿A
						</p>
						<button className={cx("button")}>
							了解更多{">>"}
						</button>
					</div>

					<div className={cx("image-container")}>
						<img
							className={cx("image")}
							src={studentWithBooks}
							alt=""
						/>
					</div>
				</div>
			</div>

			<div className={cx("section-4")}>
				<div className={cx("container")}>
					<div className={cx("image-container")}>
						<img
							className={cx("image")}
							src={learningOnline}
							alt=""
						/>
					</div>

					<div className={cx("text-container")}>
						<p className={cx("heading")}>
							第3方付款托管服务
						</p>
						<p className={cx("text")}>
							快速响应紧急问题处理，致力于为留学生解决留学过程中的各类问题，從生活，到学校，到课程，到作业，100%免费。我们的团队拥有专业客服团队，24小时随时去解答你的所有问题。
						</p>
						<button className={cx("button")}>
							了解更多{">>"}
						</button>
					</div>
				</div>
			</div>


			<div className={cx("section-5")}>
				<div className={cx("container")}>
					<div className={cx("text-container")}>
						<p className={cx("heading")}>
							第3方付款托管服务
						</p>
						<p className={cx("text")}>
							我们保障学生的每一分每一毫，这个平台每一份支付的每一个订单，錢都是交给第3方公司代收代管，直到任務完成为止，14天内免费修改，不满意就一鍵退款，没有你的同意，我们絕不会放款。
						</p>
						<button className={cx("button")}>
							了解更多{">>"}
						</button>
					</div>

					<div className={cx("image-container")}>
						<img
							className={cx("image")}
							src={guarantee}
							alt=""
						/>
					</div>
				</div>
			</div>

			<div className={cx("section-6")}>
				<div className={cx("container")}>
					<div className={cx("image-container")}>
						<img
							className={cx("image")}
							src={people}
							alt=""
						/>
					</div>

					<div className={cx("text-container")}>
						<p className={cx("heading")}>
							専业为留学生服务的法律团队
						</p>
						<p className={cx("text")}>
							解决紧急学校的各种问题。包括无故被学校开除 因成績不對跟老師的糾紛爭議。 受到老師或學校的不公平對待和歧視 因本人在美國錢被銀行鎖了等等 你在学校和生活自己解决不到的问题由我们的法律团队来解决。不用再害怕因语言不通被老师跟学校欺负。
						</p>
						<button className={cx("button")}>
							了解更多{">>"}
						</button>
					</div>
				</div>
			</div>


			<div className={cx("section-7")}>
				<img
					className={cx("bottom-curve-border")}
					src={bottomCurveBorder}
					alt=""
				/>

				<p className={cx("center-heading")}>
					自学专区自学专区
				</p>
				<p className={cx("center-text")}>
					24/7 提交作业要求提交作业要求
				</p>

				<div className={cx("image-in-center-container")}>
					<div className={cx("wrapper")}>
						<div className={cx("row-top")}>
							<div className={cx("text-container-left")}>
								<p className={cx("heading")}>
									提交作业要求提交作业要求
								</p>
								<p className={cx("text")}>
									解决紧急学校的各种问题。包括无故被学校开除 因成績不對跟老師的糾紛爭議。 受到老師或學校的不公平對待和歧視 因本人在美國錢被銀行鎖了等等 你在学校和生活自己解决不到的问题由我们的法律团队来解决。不用再害怕因语言不通被老师跟学校欺负。
								</p>
							</div>

							<div className={cx("text-container-right")}>
								<p className={cx("heading")}>
									提交作业要求提交作业要求
								</p>
								<p className={cx("text")}>
									解决紧急学校的各种问题。包括无故被学校开除 因成績不對跟老師的糾紛爭議。 受到老師或學校的不公平對待和歧視 因本人在美國錢被銀行鎖了等等 你在学校和生活自己解决不到的问题由我们的法律团队来解决。不用再害怕因语言不通被老师跟学校欺负。
								</p>
							</div>
						</div>


						<div className={cx("row-bottom")}>
							<div className={cx("text-container-left")}>
								<p className={cx("heading")}>
									提交作业要求提交作业要求
								</p>
								<p className={cx("text")}>
									解决紧急学校的各种问题。包括无故被学校开除 因成績不對跟老師的糾紛爭議。 受到老師或學校的不公平對待和歧視 因本人在美國錢被銀行鎖了等等 你在学校和生活自己解决不到的问题由我们的法律团队来解决。不用再害怕因语言不通被老师跟学校欺负。
								</p>
							</div>

							<div className={cx("text-container-right")}>
								<p className={cx("heading")}>
									提交作业要求提交作业要求
								</p>
								<p className={cx("text")}>
									解决紧急学校的各种问题。包括无故被学校开除 因成績不對跟老師的糾紛爭議。 受到老師或學校的不公平對待和歧視 因本人在美國錢被銀行鎖了等等 你在学校和生活自己解决不到的问题由我们的法律团队来解决。不用再害怕因语言不通被老师跟学校欺负。
								</p>
							</div>
						</div>
					</div>

				</div>
			</div>


			<div className={cx("footer")}>
				<p className={cx("heading")}>
					提交作业要求
				</p>
				<div className={cx("company-logos-grid")}>
					{logos.map((logoName, key) => (
						<div key={String(key)} className={cx("logo-container")}>
							<img
								src={logoName}
								alt=""
							/>
						</div>
					))}
				</div>

				<div className={cx("footer-wrapper")}>
					<div className={cx("footer-menu")}>
						<button className={cx("footer-button")}>
							Privacy Policy
						</button>

						<button className={cx("footer-button")}>
							Cookie Policy
						</button>

						<button className={cx("footer-button")}>
							Terms and Conditions
						</button>

						<button className={cx("footer-button")}>
							Terms of Use Honor Code
						</button>
					</div>

				</div>
				<p className={cx("copyright")}>
					@2022 COPYRIGHT, ALL RIGHT RESERVED
				</p>
			</div>
		</div>
	)
}
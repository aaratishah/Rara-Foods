import { InboxOutlined } from "@ant-design/icons";
import { Form, message, Upload } from "antd";
import api from "app/dashboard/api";
import config from "config";
import { useEffect, useState } from "react";
import { notificationError } from "../notification";

export default function DragDropUpload({
	multiple = false,
	name,
	setFileNames,
	fileNames,
	style,
	title,
	disabled = false,
}) {
	const [fileList, setFileList] = useState([]);
	const [nameMapping, setNameMapping] = useState([]);
	const [hasImageFetched, setHasImageFetched] = useState(false);

	useEffect(() => {
		if (!hasImageFetched && Array.isArray(fileNames) && fileNames.length > 0) {
			let files = fileNames.map((fileName, idx) => ({
				uid: `-${idx + 1}`,
				name: fileName,
				status: "done",
				url: config.getImageHost(fileName),
			}));
			setFileList(files);
			setNameMapping(files.map((each) => ({ name: each.name, uid: each.uid })));
			setHasImageFetched(true);
		}
	}, [fileNames]);

	const beforeUpload = (file) => {
		const MAX_CV_SIZE = 5; //in MB
		const isCVFileType = [
			"image/jpeg",
			"image/png",
			"application/pdf",
			"application/msword",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		].includes(file.type);
		if (!isCVFileType) {
			notificationError("Please upload valid file!");
			return false;
		}
		const isImageWithinLimitSize = file.size / 1024 / 1024 < MAX_CV_SIZE;
		if (!isImageWithinLimitSize) {
			notificationError("CV must smaller than " + MAX_CV_SIZE + "MB!");
		}
		return isCVFileType && isImageWithinLimitSize;
	};
	function deleteImageByName(uid) {
		console.log("deletee uid ", uid);
		const onDeleteSuccess = () => {
			let tempNames = nameMapping.filter((each) => each.uid != uid);
			console.log("deletee tempNames ", tempNames);

			setNameMapping([...tempNames]);
			if (setFileNames && typeof setFileNames === "function")
				setFileNames(tempNames.map((each) => each.name));
			// }
			message.success("Image removed Successfully");
		};
		const ImageIndexTobeDeleted = nameMapping.findIndex(
			(each) => each.uid.toString() + "" === uid.toString()
		);

		if (ImageIndexTobeDeleted >= 0) {
			const nameToBeDeleted = nameMapping[ImageIndexTobeDeleted].name;
			api.image
				.delete(nameToBeDeleted)
				.then(onDeleteSuccess)
				.catch((error) => {
					if (error.response.status === 404) {
						onDeleteSuccess();
					}
				});
		}
	}
	const handleChange = ({ fileList }) => setFileList(fileList);

	return (
		<Form.Item label={name || ""} style={{ ...style }}>
			<Form.Item
				valuePropName="file"
				// getValueFromEvent={normFile}
				noStyle
			>
				<Upload.Dragger
					onRemove={(file) => {
						deleteImageByName(file.uid);
					}}
					disabled={disabled}
					beforeUpload={beforeUpload}
					customRequest={({ file, onSuccess, onError }) =>
						setTimeout(() => {
							const MAX_CV_SIZE = 5; //in MB
							const isCVFileType = [
								"image/jpeg",
								"image/png",
								"application/pdf",
								"application/msword",
								"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
							].includes(file.type);
							if (!isCVFileType) {
								onError("Please upload valid file!");
								return false;
							}
							const isImageWithinLimitSize =
								file.size / 1024 / 1024 < MAX_CV_SIZE;
							if (!isImageWithinLimitSize) {
								return onError("CV must smaller than " + MAX_CV_SIZE + "MB!");
							}
							let data = new FormData();
							data.append("file", file, file.name);
							data.append("imageTitle", title);
							api.image.upload(data).then(({ success, name }) => {
								if (success) {
									setNameMapping([
										...nameMapping,
										{
											name,
											uid: file.uid,
										},
									]);
									if (setFileNames && typeof setFileNames === "function")
										setFileNames([...fileNames, name]);
									return onSuccess("ok");
								}
								onError("Not Okay");
							});
						}, 100)
					}
					onChange={handleChange}
					fileList={fileList}
					multiple={multiple}
					name="file"
					// onChange={({ fileList }) => {
					// 	if (multiple) {
					// 		setFileList(fileList);
					// 		if (typeof onSaveFile === "function") onSaveFile(fileList);
					// 		return;
					// 	}
					// 	if (fileList.length > 1) {
					// 		if (typeof onSaveFile === "function") onSaveFile([fileList[1]]);
					// 		setFileList([fileList[1]]);
					// 	}
					// }}
				>
					<div>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							Click or drag your {multiple ? "files" : "file"} to this area to
							upload
						</p>
						{/* <p className="ant-upload-hint">
								Support for a single or bulk upload.
							</p> */}
					</div>
				</Upload.Dragger>
			</Form.Item>
		</Form.Item>
	);
}

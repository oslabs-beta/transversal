import React from 'react';
import '../styles/components/operation.component.css';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const Operation = () => {
	return (
		<div className='operation-container'>
			<div className='editor'>
				<AceEditor
					className='ace'
					mode='javascript'
					height='100%'
					width='100%'
					theme='monokai'
					onChange={() => console.log('it worked')}
					name='ace'
					editorProps={{ $blockScrolling: true }}
					setOptions={{
						enableBasicAutocompletion: true,
						enableLiveAutocompletion: true,
						enableSnippets: true,
					}}
				/>
			</div>
		</div>
	);
};

export default Operation;

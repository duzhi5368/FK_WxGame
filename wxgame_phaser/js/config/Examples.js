var examples = [
	{
		key: 'basic',
		name: '基础功能测试',
		children: [
			{
				name: '加载图片',
				state: 'basicLoadAnImage'
			},
			{
				name: '点击响应',
				state: 'basicClickOnAnImageState'
			},
			{
				name: '物理测试',
				state: 'basicMoveAnImageState'
			},
			{
				name: '触碰测试',
				state: 'basicImageFollowInputState'
			},
			{
        name: '播放动画',
				state: 'basicLoadAnAnimationState'
			},
			{
        name: '字体渲染',
				state: 'basicRenderTextState'
			},
			{
				name: 'Tween动画',
				state: 'basicTweenAnImageState'
			}
		]
	},
	{
		key: 'open',
		name: '微信接口测试',
		children: [
			{
				name: '使用开放区域Canvas',
				state: 'openShowOpenCanvas'
			},
			{
				name: '设置数据到云数据库',
				state: 'openSetCloudScore'
			},
			{
				name: '从云端数据获取数据',
				state: 'openGetCloudScore'
			},
			{
				name: '获取好友分数',
				state: 'openGetFriendCloudScore'
			},
			{
				name: '显示朋友排名列表',
				state: 'openShowRankingList'
			}
		]
  },
  {
    key: 'game',
    name: '完整小游戏',
    children: [
      {
        name: '微信小飞机',
        state: 'planePreload'
      }
    ]
  }
];

export default examples;

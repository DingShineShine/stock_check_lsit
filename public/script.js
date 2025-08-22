// 决策流程数据结构
const decisionFlow = {
    currentStep: 0,
    totalSteps: 5,
    answers: {},
    
    // 问题流程定义
    questions: [
        {
            id: 'operation_type',
            title: '🎯 你准备进行什么操作？',
            description: '首先确定你的交易意图',
            options: [
                { id: 'buy', text: '🟢 买入', value: 'buy', class: 'buy' },
                { id: 'sell', text: '🔴 卖出', value: 'sell', class: 'sell' }
            ]
        },
        {
            id: 'environment_analysis',
            title: '🔍 环境研判检查',
            description: '你的判断基础是否客观？',
            options: [
                { id: 'objective', text: '✅ 基于市场走势和量价的客观分析', value: 'objective' },
                { id: 'subjective', text: '❌ 主要基于个人感觉和主观臆测', value: 'subjective' }
            ]
        },
        {
            id: 'logic_check',
            title: '📊 操作逻辑验证',
            description: '验证你的买入/卖出逻辑',
            getDynamicOptions: function(answers) {
                if (answers.operation_type === 'buy') {
                    return [
                        { id: 'hotspot', text: '🔥 热点买入：有板块效应，选择最优标的', value: 'hotspot_buy' },
                        { id: 'trend', text: '📈 趋势买入：上涨放量有力，下跌缩量企稳', value: 'trend_buy' },
                        { id: 'oversold', text: '📉 超跌买入：标的率先出现企稳信号', value: 'oversold_buy' }
                    ];
                } else {
                    return [
                        { id: 'profit_taking', text: '💰 获利了结：已达到预期收益目标', value: 'profit_taking' },
                        { id: 'risk_control', text: '🛡️ 风险控制：出现明确风险信号', value: 'risk_control' },
                        { id: 'trend_break', text: '📉 趋势破坏：技术形态发生恶化', value: 'trend_break' }
                    ];
                }
            }
        },
        {
            id: 'timing_check',
            title: '⏰ 操作时机检查',
            description: '时机选择是否符合市场规律？',
            getDynamicOptions: function(answers) {
                if (answers.operation_type === 'buy') {
                    return [
                        { id: 'good_timing', text: '✅ 在下跌强势中买入（弱势中见强势）', value: 'good_buy_timing' },
                        { id: 'bad_timing', text: '❌ 在上涨追高中买入（追涨杀跌）', value: 'bad_buy_timing' }
                    ];
                } else {
                    return [
                        { id: 'good_timing', text: '✅ 在上涨弱势中卖出（强势中见弱势）', value: 'good_sell_timing' },
                        { id: 'bad_timing', text: '❌ 在下跌恐慌中卖出（恐慌性抛售）', value: 'bad_sell_timing' }
                    ];
                }
            }
        },
        {
            id: 'mindset_check',
            title: '🧠 心态风险检查',
            description: '检查你的心态和风险承受能力',
            getDynamicOptions: function(answers) {
                if (answers.operation_type === 'buy') {
                    return [
                        { id: 'rational_buy', text: '✅ 基于机会分析，能承受亏损风险', value: 'rational_buy' },
                        { id: 'fear_buy', text: '❌ 基于踏空恐惧，无法承受亏损', value: 'fear_buy' }
                    ];
                } else {
                    return [
                        { id: 'rational_sell', text: '✅ 基于风险评估，能承受踏空风险', value: 'rational_sell' },
                        { id: 'fear_sell', text: '❌ 基于亏损恐惧，无法承受继续持有', value: 'fear_sell' }
                    ];
                }
            }
        }
    ]
};

// DOM 元素（在DOM加载后获取）
let progressFill, currentStepEl, totalStepsEl, questionContainer, welcomeCard, resultCard;

// 初始化
function init() {
    console.log('🚀 开始初始化...');
    
    // 获取DOM元素
    progressFill = document.getElementById('progressFill');
    currentStepEl = document.getElementById('currentStep');
    totalStepsEl = document.getElementById('totalSteps');
    questionContainer = document.getElementById('questionContainer');
    welcomeCard = document.getElementById('welcomeCard');
    resultCard = document.getElementById('resultCard');
    
    // 检查元素是否找到
    console.log('DOM元素检查:', {
        progressFill: !!progressFill,
        currentStepEl: !!currentStepEl,
        totalStepsEl: !!totalStepsEl,
        questionContainer: !!questionContainer,
        welcomeCard: !!welcomeCard,
        resultCard: !!resultCard
    });
    
    if (!welcomeCard) {
        console.error('❌ 找不到welcomeCard元素!');
        return;
    }
    
    // 设置初始值
    totalStepsEl.textContent = decisionFlow.totalSteps;
    updateProgress();
    
    // 验证按钮是否正确加载（使用onclick方式，无需添加事件监听器）
    const startButton = document.querySelector('.btn-primary');
    if (startButton) {
        console.log('✅ 开始按钮已正确加载 (使用onclick方式)');
    } else {
        console.error('❌ 找不到开始按钮!');
    }
    
    // 标记初始化完成
    window.initComplete = true;
    
    console.log('✅ 股票决策助手初始化完成');
}

// 开始决策流程（修复版 - 不依赖全局变量）
function startDecision() {
    console.log('🎯 开始决策按钮被点击!');
    
    // 直接获取DOM元素，不依赖全局变量
    const welcomeCard = document.getElementById('welcomeCard');
    const questionContainer = document.getElementById('questionContainer');
    
    if (!welcomeCard) {
        console.error('❌ 找不到welcomeCard元素');
        return;
    }
    
    if (!questionContainer) {
        console.error('❌ 找不到questionContainer元素');
        return;
    }
    
    console.log('🔄 正在切换到第一个问题...');
    welcomeCard.classList.add('slide-out');
    
    setTimeout(() => {
        welcomeCard.classList.remove('active');
        
        // 更新流程状态
        decisionFlow.currentStep = 1;
        
        // 显示第一个问题
        const question = decisionFlow.questions[0];
        const questionCard = document.createElement('div');
        questionCard.className = 'card active entering';
        questionCard.innerHTML = `
            <div class="card-header">
                <h2>${question.title}</h2>
                <p>${question.description}</p>
            </div>
            <div class="card-body">
                <div class="question-options">
                    ${question.options.map(option => `
                        <button class="option-btn ${option.class || ''}" onclick="selectOption('${question.id}', '${option.value}', this)">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        questionContainer.innerHTML = '';
        questionContainer.appendChild(questionCard);
        
        // 更新进度条
        const progressFill = document.getElementById('progressFill');
        const currentStepEl = document.getElementById('currentStep');
        if (progressFill && currentStepEl) {
            const progress = (1 / 5) * 100;
            progressFill.style.width = progress + '%';
            currentStepEl.textContent = '1';
        }
        
        console.log('✅ 已显示第一个问题');
    }, 300);
}

// 确保全局可访问
window.startDecision = startDecision;

// 修复版启动函数（这个版本确认能工作）
function fixedStartDecision() {
    console.log('💙 修复版startDecision开始');
    
    // 获取股票名称
    const stockNameInput = document.getElementById('stockNameInput');
    const stockName = stockNameInput ? stockNameInput.value.trim() : '';
    
    if (!stockName) {
        alert('请先输入股票名称或代码');
        if (stockNameInput) stockNameInput.focus();
        return;
    }
    
    // 保存股票名称到流程数据中
    decisionFlow.stockName = stockName;
    
    // 直接获取DOM元素，不依赖全局变量
    const welcomeCard = document.getElementById('welcomeCard');
    const questionContainer = document.getElementById('questionContainer');
    
    if (!welcomeCard) {
        console.error('❌ 找不到welcomeCard元素');
        return;
    }
    
    if (!questionContainer) {
        console.error('❌ 找不到questionContainer元素');
        return;
    }
    
    console.log('✅ 找到所有必要元素，开始决策流程，股票：', stockName);
    
    // 隐藏欢迎卡片
    welcomeCard.classList.add('slide-out');
    
    setTimeout(() => {
        welcomeCard.classList.remove('active');
        
        // 更新流程状态
        decisionFlow.currentStep = 1;
        
        // 显示第一个问题（直接内联，避免函数调用问题）
        const question = decisionFlow.questions[0];
        const questionCard = document.createElement('div');
        questionCard.className = 'card active entering';
        questionCard.innerHTML = `
            <div class="card-header">
                <h2>${question.title}</h2>
                <p>${question.description}</p>
            </div>
            <div class="card-body">
                <div class="question-options">
                    ${question.options.map(option => `
                        <button class="option-btn ${option.class || ''}" onclick="selectOption('${question.id}', '${option.value}', this)">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        questionContainer.innerHTML = '';
        questionContainer.appendChild(questionCard);
        
        // 更新进度条
        const progressFill = document.getElementById('progressFill');
        const currentStepEl = document.getElementById('currentStep');
        if (progressFill && currentStepEl) {
            const progress = (1 / 5) * 100;
            progressFill.style.width = progress + '%';
            currentStepEl.textContent = '1';
        }
        
        console.log('✅ 修复版启动成功，显示第一个问题');
    }, 300);
}

// 确保修复版函数全局可访问
window.fixedStartDecision = fixedStartDecision;

// 显示问题
function showQuestion(questionIndex) {
    const question = decisionFlow.questions[questionIndex];
    if (!question) return;

    // 获取选项（可能是动态的）
    const options = question.getDynamicOptions ? 
        question.getDynamicOptions(decisionFlow.answers) : 
        question.options;

    // 创建问题卡片
    const questionCard = document.createElement('div');
    questionCard.className = 'card active entering';
    questionCard.innerHTML = `
        <div class="card-header">
            <h2>${question.title}</h2>
            <p>${question.description}</p>
        </div>
        <div class="card-body">
            <div class="question-options">
                ${options.map((option, index) => `
                    <button class="option-btn ${option.class || ''}" 
                            onclick="selectOption('${question.id}', '${option.value}', this)">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    questionContainer.innerHTML = '';
    questionContainer.appendChild(questionCard);
}

// 选择选项
function selectOption(questionId, value, buttonEl) {
    // 记录答案
    decisionFlow.answers[questionId] = value;
    
    // 更新按钮状态
    const allButtons = buttonEl.parentNode.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    buttonEl.classList.add('selected');
    
    // 延迟处理下一步
    setTimeout(() => {
        nextStep();
    }, 800);
}

// 下一步
function nextStep() {
    decisionFlow.currentStep++;
    updateProgress();
    
    if (decisionFlow.currentStep <= decisionFlow.totalSteps) {
        // 还有问题，继续
        const currentCard = questionContainer.querySelector('.card');
        if (currentCard) {
            currentCard.classList.add('slide-out');
            setTimeout(() => {
                showQuestion(decisionFlow.currentStep - 1);
            }, 300);
        }
    } else {
        // 完成所有问题，显示结果
        showResult();
    }
}

// 显示结果
function showResult() {
    const currentCard = questionContainer.querySelector('.card');
    if (currentCard) {
        currentCard.classList.add('slide-out');
    }
    
    setTimeout(() => {
        questionContainer.innerHTML = '';
        analyzeDecision();
        resultCard.classList.add('active', 'entering');
    }, 300);
}

// 分析决策结果
function analyzeDecision() {
    const answers = decisionFlow.answers;
    const operationType = answers.operation_type;
    
    // 计算得分
    let score = 0;
    let maxScore = 4; // 除了第一个问题，其他4个问题都有分数
    
    // 环境分析得分
    if (answers.environment_analysis === 'objective') score++;
    
    // 逻辑检查得分
    if (operationType === 'buy') {
        if (['hotspot_buy', 'trend_buy', 'oversold_buy'].includes(answers.logic_check)) {
            score++;
        }
    } else {
        if (['profit_taking', 'risk_control', 'trend_break'].includes(answers.logic_check)) {
            score++;
        }
    }
    
    // 时机检查得分
    if (answers.timing_check === 'good_buy_timing' || answers.timing_check === 'good_sell_timing') {
        score++;
    }
    
    // 心态检查得分
    if (answers.mindset_check === 'rational_buy' || answers.mindset_check === 'rational_sell') {
        score++;
    }
    
    // 生成结果
    generateResult(operationType, score, maxScore);
}

// 生成结果显示
function generateResult(operationType, score, maxScore) {
    const resultTitle = document.getElementById('resultTitle');
    const resultIcon = document.getElementById('resultIcon');
    const resultMessage = document.getElementById('resultMessage');
    const decisionSummary = document.getElementById('decisionSummary');
    
    let icon, message, messageClass, title;
    
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 75) {
        // 高分通过
        if (operationType === 'buy') {
            icon = '🎯';
            message = '祝你好运，冒险家！';
            title = '✅ 买入决策通过';
        } else {
            icon = '🛡️';
            message = '理性止盈，保护收益！';
            title = '✅ 卖出决策通过';
        }
        messageClass = 'success';
    } else if (percentage >= 50) {
        // 中等分数
        icon = '⚠️';
        message = '决策基本合理，但仍需谨慎';
        messageClass = 'warning';
        title = '⚠️ 谨慎执行';
    } else {
        // 低分
        icon = '🚫';
        message = '建议重新评估决策';
        messageClass = 'danger';
        title = '❌ 不建议执行';
    }
    
    resultTitle.textContent = title;
    resultIcon.textContent = icon;
    resultMessage.textContent = message;
    resultMessage.className = `result-message ${messageClass}`;
    
    // 生成决策摘要
    const summary = generateDecisionSummary();
    decisionSummary.innerHTML = `
        <h3>📋 决策摘要</h3>
        <div class="summary-item">
            <span class="summary-label">操作类型</span>
            <span class="summary-value">${operationType === 'buy' ? '🟢 买入' : '🔴 卖出'}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">决策得分</span>
            <span class="summary-value">${score}/${maxScore} (${percentage.toFixed(0)}%)</span>
        </div>
        ${summary.map(item => `
            <div class="summary-item">
                <span class="summary-label">${item.label}</span>
                <span class="summary-value">${item.value}</span>
            </div>
        `).join('')}
        <div class="summary-item">
            <span class="summary-label">决策时间</span>
            <span class="summary-value">${new Date().toLocaleString('zh-CN')}</span>
        </div>
    `;
}

// 生成决策摘要
function generateDecisionSummary() {
    const answers = decisionFlow.answers;
    const summary = [];
    
    // 环境分析
    summary.push({
        label: '环境分析',
        value: answers.environment_analysis === 'objective' ? '✅ 客观分析' : '❌ 主观臆测'
    });
    
    // 操作逻辑
    const logicMap = {
        'hotspot_buy': '🔥 热点买入',
        'trend_buy': '📈 趋势买入',
        'oversold_buy': '📉 超跌买入',
        'profit_taking': '💰 获利了结',
        'risk_control': '🛡️ 风险控制',
        'trend_break': '📉 趋势破坏'
    };
    summary.push({
        label: '操作逻辑',
        value: logicMap[answers.logic_check] || '未知'
    });
    
    // 操作时机
    const timingMap = {
        'good_buy_timing': '✅ 时机良好',
        'bad_buy_timing': '❌ 时机不当',
        'good_sell_timing': '✅ 时机良好',
        'bad_sell_timing': '❌ 时机不当'
    };
    summary.push({
        label: '操作时机',
        value: timingMap[answers.timing_check] || '未知'
    });
    
    // 心态状态
    const mindsetMap = {
        'rational_buy': '✅ 理性决策',
        'fear_buy': '❌ 恐惧驱动',
        'rational_sell': '✅ 理性决策',
        'fear_sell': '❌ 恐惧驱动'
    };
    summary.push({
        label: '心态状态',
        value: mindsetMap[answers.mindset_check] || '未知'
    });
    
    return summary;
}

// 更新进度条
function updateProgress() {
    const progress = (decisionFlow.currentStep / decisionFlow.totalSteps) * 100;
    progressFill.style.width = `${progress}%`;
    currentStepEl.textContent = decisionFlow.currentStep;
}

// 重新开始
function restartDecision() {
    // 重置数据
    decisionFlow.currentStep = 0;
    decisionFlow.answers = {};
    decisionFlow.stockName = '';
    
    // 获取DOM元素
    const welcomeCard = document.getElementById('welcomeCard');
    const resultCard = document.getElementById('resultCard');
    const stockNameInput = document.getElementById('stockNameInput');
    
    // 隐藏结果卡片
    if (resultCard) {
        resultCard.classList.remove('active');
    }
    
    // 显示欢迎卡片
    setTimeout(() => {
        if (welcomeCard) {
            welcomeCard.classList.add('active');
            welcomeCard.classList.remove('slide-out');
        }
        
        // 清空股票输入框
        if (stockNameInput) {
            stockNameInput.value = '';
            stockNameInput.focus();
        }
        
        // 更新进度条
        const progressFill = document.getElementById('progressFill');
        const currentStepEl = document.getElementById('currentStep');
        if (progressFill && currentStepEl) {
            progressFill.style.width = '0%';
            currentStepEl.textContent = '0';
        }
    }, 300);
}

// 保存决策
function saveDecision() {
    const decision = {
        id: Date.now().toString(),
        stockName: decisionFlow.stockName || '未知股票',
        timestamp: new Date().toISOString(),
        answers: decisionFlow.answers,
        summary: generateDecisionSummary(),
        result: getDecisionResult()
    };
    
    // 保存到本地存储
    const savedDecisions = JSON.parse(localStorage.getItem('stockDecisions') || '[]');
    savedDecisions.unshift(decision); // 添加到数组开头，最新的在前面
    
    // 限制保存数量，最多保存50条记录
    if (savedDecisions.length > 50) {
        savedDecisions.splice(50);
    }
    
    localStorage.setItem('stockDecisions', JSON.stringify(savedDecisions));
    
    alert('✅ 决策已保存到本地！');
}

// 获取决策结果（用于历史记录显示）
function getDecisionResult() {
    const answers = decisionFlow.answers;
    const operationType = answers.operation_type;
    
    // 计算得分
    let score = 0;
    let maxScore = 4;
    
    if (answers.environment_analysis === 'objective') score++;
    if (operationType === 'buy') {
        if (['hotspot_buy', 'trend_buy', 'oversold_buy'].includes(answers.logic_check)) score++;
    } else {
        if (['profit_taking', 'risk_control', 'trend_break'].includes(answers.logic_check)) score++;
    }
    if (answers.timing_check === 'good_buy_timing' || answers.timing_check === 'good_sell_timing') score++;
    if (answers.mindset_check === 'rational_buy' || answers.mindset_check === 'rational_sell') score++;
    
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 75) {
        return {
            level: 'success',
            message: operationType === 'buy' ? '🎯 祝你好运，冒险家！' : '🛡️ 理性止盈，保护收益！',
            score: score,
            maxScore: maxScore,
            percentage: percentage
        };
    } else if (percentage >= 50) {
        return {
            level: 'warning',
            message: '⚠️ 决策基本合理，但仍需谨慎',
            score: score,
            maxScore: maxScore,
            percentage: percentage
        };
    } else {
        return {
            level: 'danger',
            message: '🚫 建议重新评估决策',
            score: score,
            maxScore: maxScore,
            percentage: percentage
        };
    }
}

// 显示历史记录
function showHistory() {
    console.log('📋 显示历史记录');
    
    const welcomeCard = document.getElementById('welcomeCard');
    const historyCard = document.getElementById('historyCard');
    const historyList = document.getElementById('historyList');
    
    if (!welcomeCard || !historyCard || !historyList) {
        console.error('❌ 找不到必要的历史记录元素');
        return;
    }
    
    // 隐藏欢迎卡片
    welcomeCard.classList.remove('active');
    welcomeCard.classList.add('slide-out');
    
    // 显示历史记录卡片
    setTimeout(() => {
        historyCard.classList.add('active');
        loadHistoryList();
    }, 300);
}

// 加载历史记录列表
function loadHistoryList() {
    const historyList = document.getElementById('historyList');
    const savedDecisions = JSON.parse(localStorage.getItem('stockDecisions') || '[]');
    
    if (savedDecisions.length === 0) {
        historyList.innerHTML = '<div class="history-empty">暂无历史决策记录</div>';
        return;
    }
    
    const historyHTML = savedDecisions.map(decision => {
        const date = new Date(decision.timestamp);
        const dateStr = date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const operationType = decision.answers.operation_type || 'unknown';
        const operationText = operationType === 'buy' ? '买入' : operationType === 'sell' ? '卖出' : '未知';
        const operationClass = operationType === 'buy' ? 'buy' : 'sell';
        
        const result = decision.result || { level: 'warning', message: '结果未知', score: 0, maxScore: 4 };
        
        return `
            <div class="history-item">
                <div class="history-header">
                    <div class="history-stock">📈 ${decision.stockName}</div>
                    <div class="history-date">${dateStr}</div>
                </div>
                <div style="margin-bottom: 10px;">
                    <span class="history-operation ${operationClass}">${operationText}</span>
                    <span class="history-result ${result.level}">${result.message}</span>
                </div>
                <div class="history-details">
                    决策得分：${result.score}/${result.maxScore} (${result.percentage.toFixed(0)}%)
                    ${decision.summary && decision.summary.length > 0 ? '<br>决策要点：' + decision.summary.map(s => s.value).join('，') : ''}
                </div>
            </div>
        `;
    }).join('');
    
    historyList.innerHTML = historyHTML;
}

// 关闭历史记录
function closeHistory() {
    console.log('🏠 返回首页');
    
    const welcomeCard = document.getElementById('welcomeCard');
    const historyCard = document.getElementById('historyCard');
    
    if (!welcomeCard || !historyCard) {
        console.error('❌ 找不到必要的卡片元素');
        return;
    }
    
    // 隐藏历史记录卡片
    historyCard.classList.remove('active');
    historyCard.classList.add('slide-out');
    
    // 显示欢迎卡片
    setTimeout(() => {
        welcomeCard.classList.add('active');
        welcomeCard.classList.remove('slide-out');
        
        // 清空股票输入框
        const stockNameInput = document.getElementById('stockNameInput');
        if (stockNameInput) {
            stockNameInput.value = '';
        }
    }, 300);
}

// 清空历史记录
function clearHistory() {
    if (confirm('确定要清空所有历史记录吗？此操作不可恢复。')) {
        localStorage.removeItem('stockDecisions');
        loadHistoryList();
        console.log('🗑️ 历史记录已清空');
    }
}

// 确保历史记录函数全局可访问
window.showHistory = showHistory;
window.closeHistory = closeHistory;
window.clearHistory = clearHistory;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 股票决策助手正在启动...');
    init();
});

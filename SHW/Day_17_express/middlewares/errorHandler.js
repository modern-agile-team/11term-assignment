// 404 에러 핸들러
exports.notFound = (req, res) => {
    res.status(404).json({ error: "API 엔드포인트를 찾을 수 없습니다." });
};

// 전역 에러 핸들러 (필요시 사용)
exports.errorHandler = (err, req, res, next) => {
    console.error('에러 발생:', err);

    res.status(err.status || 500).json({
        error: err.message || "서버 오류가 발생했습니다."
    });
};

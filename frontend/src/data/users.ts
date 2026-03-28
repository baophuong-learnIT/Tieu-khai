import type { SalesUser } from '@/types/domain';

/**
 * USERS DATABASE
 * Fields: r=region, a=area, u=user, p=password, s=spins allocated
 */
export const USERS: SalesUser[] = [
  { r: 'AN GIANG', a: 'AN GIANG 1', u: 'angiang1', p: 'angiang1', s: 1 },
  { r: 'AN GIANG', a: 'AN GIANG 2', u: 'angiang2', p: 'angiang2', s: 2 },
  { r: 'AN GIANG', a: 'AN GIANG 3', u: 'angiang3', p: 'angiang3', s: 2 },
  { r: 'AN GIANG', a: 'AN GIANG 4', u: 'angiang4', p: 'angiang4', s: 2 },
  { r: 'AN GIANG', a: 'AN GIANG 5', u: 'angiang5', p: 'angiang5', s: 2 },

  { r: 'KIÊN GIANG', a: 'KIÊN GIANG 1', u: 'kiengiang1', p: 'kiengiang1', s: 1 },
  { r: 'KIÊN GIANG', a: 'KIÊN GIANG 2', u: 'kiengiang2', p: 'kiengiang2', s: 1 },
  { r: 'KIÊN GIANG', a: 'KIÊN GIANG 3', u: 'kiengiang3', p: 'kiengiang3', s: 1 },
  { r: 'KIÊN GIANG', a: 'KIÊN GIANG 4', u: 'kiengiang4', p: 'kiengiang4', s: 1 },

  { r: 'C.THƠ-H.GIANG', a: 'CẦN THƠ 1', u: 'cantho1', p: 'cantho1', s: 1 },
  { r: 'C.THƠ-H.GIANG', a: 'CẦN THƠ 2', u: 'cantho2', p: 'cantho2', s: 1 },
  { r: 'C.THƠ-H.GIANG', a: 'HẬU GIANG 1', u: 'haugiang1', p: 'haugiang1', s: 1 },
  { r: 'C.THƠ-H.GIANG', a: 'HẬU GIANG 2', u: 'haugiang2', p: 'haugiang2', s: 1 },

  { r: 'S.TRĂNG-B.LIÊU-C.MAU', a: 'BẠC LIÊU 1', u: 'baclieu1', p: 'baclieu1', s: 1 },
  { r: 'S.TRĂNG-B.LIÊU-C.MAU', a: 'BẠC LIÊU 2 - CÀ MAU', u: 'baclieu2camau', p: 'baclieu2camau', s: 1 },
  { r: 'S.TRĂNG-B.LIÊU-C.MAU', a: 'SÓC TRĂNG 1', u: 'soctrang1', p: 'soctrang1', s: 1 },
  { r: 'S.TRĂNG-B.LIÊU-C.MAU', a: 'SÓC TRĂNG 2', u: 'soctrang2', p: 'soctrang2', s: 1 },
  { r: 'S.TRĂNG-B.LIÊU-C.MAU', a: 'SÓC TRĂNG 3', u: 'soctrang3', p: 'soctrang3', s: 1 },

  { r: 'LONG AN', a: 'LONG AN 1', u: 'longan1', p: 'longan1', s: 1 },
  { r: 'LONG AN', a: 'LONG AN 2', u: 'longan2', p: 'longan2', s: 1 },
  { r: 'LONG AN', a: 'LONG AN 3', u: 'longan3', p: 'longan3', s: 1 },
  { r: 'LONG AN', a: 'LONG AN 4', u: 'longan4', p: 'longan4', s: 1 },
  { r: 'LONG AN', a: 'LONG AN 5', u: 'longan5', p: 'longan5', s: 1 },
  { r: 'LONG AN', a: 'LONG AN 6', u: 'longan6', p: 'longan6', s: 1 },

  { r: 'ĐÔNG T.GIANG-B.TRE', a: 'BẾN TRE 1', u: 'bentre1', p: 'bentre1', s: 1 },
  { r: 'ĐÔNG T.GIANG-B.TRE', a: 'BẾN TRE 2', u: 'bentre2', p: 'bentre2', s: 1 },
  { r: 'ĐÔNG T.GIANG-B.TRE', a: 'ĐÔNG TIỀN GIANG 1', u: 'dongtiengiang1', p: 'dongtiengiang1', s: 1 },
  { r: 'ĐÔNG T.GIANG-B.TRE', a: 'ĐÔNG TIỀN GIANG 2', u: 'dongtiengiang2', p: 'dongtiengiang2', s: 1 },
  { r: 'ĐÔNG T.GIANG-B.TRE', a: 'ĐÔNG TIỀN GIANG 3', u: 'dongtiengiang3', p: 'dongtiengiang3', s: 1 },

  { r: 'TÂY TIỀN GIANG', a: 'TÂY TIỀN GIANG 1', u: 'taytiengiang1', p: 'taytiengiang1', s: 1 },
  { r: 'TÂY TIỀN GIANG', a: 'TÂY TIỀN GIANG 2', u: 'taytiengiang2', p: 'taytiengiang2', s: 1 },
  { r: 'TÂY TIỀN GIANG', a: 'TÂY TIỀN GIANG 3', u: 'taytiengiang3', p: 'taytiengiang3', s: 1 },
  { r: 'TÂY TIỀN GIANG', a: 'TÂY TIỀN GIANG 4', u: 'taytiengiang4', p: 'taytiengiang4', s: 1 },

  { r: 'BẮC ĐỒNG THÁP', a: 'BẮC ĐỒNG THÁP 1', u: 'bacdongthap1', p: 'bacdongthap1', s: 1 },
  { r: 'BẮC ĐỒNG THÁP', a: 'BẮC ĐỒNG THÁP 2', u: 'bacdongthap2', p: 'bacdongthap2', s: 1 },
  { r: 'BẮC ĐỒNG THÁP', a: 'BẮC ĐỒNG THÁP 3', u: 'bacdongthap3', p: 'bacdongthap3', s: 1 },
  { r: 'BẮC ĐỒNG THÁP', a: 'BẮC ĐỒNG THÁP 4', u: 'bacdongthap4', p: 'bacdongthap4', s: 1 },

  { r: 'NAM ĐỒNG THÁP', a: 'NAM ĐỒNG THÁP 1', u: 'namdongthap1', p: 'namdongthap1', s: 1 },
  { r: 'NAM ĐỒNG THÁP', a: 'NAM ĐỒNG THÁP 2', u: 'namdongthap2', p: 'namdongthap2', s: 1 },
  { r: 'NAM ĐỒNG THÁP', a: 'NAM ĐỒNG THÁP 3', u: 'namdongthap3', p: 'namdongthap3', s: 1 },
  { r: 'NAM ĐỒNG THÁP', a: 'NAM ĐỒNG THÁP 4', u: 'namdongthap4', p: 'namdongthap4', s: 1 },

  { r: 'V.LONG-T.VINH', a: 'TRÀ VINH 1', u: 'travinh1', p: 'travinh1', s: 1 },
  { r: 'V.LONG-T.VINH', a: 'TRÀ VINH 2', u: 'travinh2', p: 'travinh2', s: 1 },
  { r: 'V.LONG-T.VINH', a: 'VĨNH LONG 1', u: 'vinhlong1', p: 'vinhlong1', s: 1 },
  { r: 'V.LONG-T.VINH', a: 'VĨNH LONG 2', u: 'vinhlong2', p: 'vinhlong2', s: 1 },

  { r: 'TÂY NINH', a: 'TÂY NINH 1', u: 'tayninh1', p: 'tayninh1', s: 1 },
  { r: 'TÂY NINH', a: 'TÂY NINH 2', u: 'tayninh2', p: 'tayninh2', s: 1 },
  { r: 'TÂY NINH', a: 'TÂY NINH 3', u: 'tayninh3', p: 'tayninh3', s: 1 },

  { r: 'BÌNH PHƯỚC', a: 'BÌNH PHƯỚC 1', u: 'binhphuoc1', p: 'binhphuoc1', s: 1 },
  { r: 'BÌNH PHƯỚC', a: 'BÌNH PHƯỚC 2', u: 'binhphuoc2', p: 'binhphuoc2', s: 1 },
  { r: 'BÌNH PHƯỚC', a: 'BÌNH PHƯỚC 3', u: 'binhphuoc3', p: 'binhphuoc3', s: 1 },
  { r: 'BÌNH PHƯỚC', a: 'BÌNH PHƯỚC 4', u: 'binhphuoc4', p: 'binhphuoc4', s: 1 },

  { r: 'Đ.NAI-BRVT', a: 'BÀ RỊA-VŨNG TÀU', u: 'bariavungtau', p: 'bariavungtau', s: 1 },
  { r: 'Đ.NAI-BRVT', a: 'ĐỒNG NAI 1', u: 'dongnai1', p: 'dongnai1', s: 1 },
  { r: 'Đ.NAI-BRVT', a: 'ĐỒNG NAI 2', u: 'dongnai2', p: 'dongnai2', s: 1 },
  { r: 'Đ.NAI-BRVT', a: 'ĐỒNG NAI 3', u: 'dongnai3', p: 'dongnai3', s: 1 },
  { r: 'Đ.NAI-BRVT', a: 'ĐỒNG NAI 4', u: 'dongnai4', p: 'dongnai4', s: 1 },

  { r: 'NAM TRUNG BỘ', a: 'BÌNH THUẬN 1', u: 'binhthuan1', p: 'binhthuan1', s: 1 },
  { r: 'NAM TRUNG BỘ', a: 'BÌNH THUẬN 2', u: 'binhthuan2', p: 'binhthuan2', s: 1 },
  { r: 'NAM TRUNG BỘ', a: 'BÌNH THUẬN 3', u: 'binhthuan3', p: 'binhthuan3', s: 1 },
  { r: 'NAM TRUNG BỘ', a: 'KHÁNH HÒA 1', u: 'khanhhoa1', p: 'khanhhoa1', s: 1 },
  { r: 'NAM TRUNG BỘ', a: 'KHÁNH HÒA 2', u: 'khanhhoa2', p: 'khanhhoa2', s: 1 },
  { r: 'NAM TRUNG BỘ', a: 'NINH THUẬN 1', u: 'ninhthuan1', p: 'ninhthuan1', s: 1 },
  { r: 'NAM TRUNG BỘ', a: 'NINH THUẬN 2', u: 'ninhthuan2', p: 'ninhthuan2', s: 1 },

  { r: 'LÂM ĐỒNG', a: 'LÂM ĐỒNG 1', u: 'lamdong1', p: 'lamdong1', s: 1 },
  { r: 'LÂM ĐỒNG', a: 'LÂM ĐỒNG 2', u: 'lamdong2', p: 'lamdong2', s: 1 },
  { r: 'LÂM ĐỒNG', a: 'LÂM ĐỒNG 3', u: 'lamdong3', p: 'lamdong3', s: 1 },
  { r: 'LÂM ĐỒNG', a: 'LÂM ĐỒNG 4', u: 'lamdong4', p: 'lamdong4', s: 1 },
  { r: 'LÂM ĐỒNG', a: 'LÂM ĐỒNG 5', u: 'lamdong5', p: 'lamdong5', s: 1 },

  { r: 'ĐAK LAK - ĐAK NÔNG', a: 'ĐAK LAK 1', u: 'daklak1', p: 'daklak1', s: 1 },
  { r: 'ĐAK LAK - ĐAK NÔNG', a: 'ĐAK LAK 2', u: 'daklak2', p: 'daklak2', s: 1 },
  { r: 'ĐAK LAK - ĐAK NÔNG', a: 'ĐAK LAK 3', u: 'daklak3', p: 'daklak3', s: 1 },
  { r: 'ĐAK LAK - ĐAK NÔNG', a: 'ĐAK NÔNG', u: 'daknong', p: 'daknong', s: 1 },
  { r: 'ĐAK LAK - ĐAK NÔNG', a: 'PHÚ YÊN', u: 'phuyen', p: 'phuyen', s: 1 },

  { r: 'GIA LAI - BÌNH ĐỊNH', a: 'GIA LAI 1', u: 'gialai1', p: 'gialai1', s: 1 },
  { r: 'GIA LAI - BÌNH ĐỊNH', a: 'GIA LAI 2 - KON TUM', u: 'gialai2kontum', p: 'gialai2kontum', s: 1 },
  { r: 'GIA LAI - BÌNH ĐỊNH', a: 'GIA LAI 3', u: 'gialai3', p: 'gialai3', s: 1 },
  { r: 'GIA LAI - BÌNH ĐỊNH', a: 'BÌNH ĐỊNH 1', u: 'binhdinh1', p: 'binhdinh1', s: 1 },
  { r: 'GIA LAI - BÌNH ĐỊNH', a: 'BÌNH ĐỊNH 2', u: 'binhdinh2', p: 'binhdinh2', s: 1 },
];
